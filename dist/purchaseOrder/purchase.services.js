"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseOrderService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const config_1 = require("@nestjs/config");
const purchase_schema_1 = require("./schema/purchase.schema");
const convert_id_1 = require("../utils/convert-id");
const purchase_order_entity_1 = require("./domain/purchase-order.entity");
const mail_service_1 = require("../mail/mail.service");
const payment_service_1 = require("../payment/payment.service");
const course_schema_1 = require("../course/schema/course.schema");
const mongoose_3 = require("mongoose");
const create_booking_dto_1 = require("../booking/dto/create-booking.dto");
const booking_schema_1 = require("../booking/schema/booking.schema");
const class_schedule_helper_service_1 = require("../utils/class-schedule/class-schedule-helper.service");
let PurchaseOrderService = class PurchaseOrderService {
    constructor(purchaseOrderModel, mailService, paymentService, bookingModel, configService, courseModel, classScheduleHelper) {
        this.purchaseOrderModel = purchaseOrderModel;
        this.mailService = mailService;
        this.paymentService = paymentService;
        this.bookingModel = bookingModel;
        this.configService = configService;
        this.courseModel = courseModel;
        this.classScheduleHelper = classScheduleHelper;
        this.purchaseOrderPopulate = [
            { path: 'student', select: 'firstName lastName email' },
            { path: 'financialContact', select: 'firstName lastName email' },
            { path: 'course', select: 'title slug price currency sessions details' },
        ];
    }
    map(doc) {
        if (!doc)
            return undefined;
        const sanitized = (0, convert_id_1.sanitizeMongooseDocument)(doc);
        if (!sanitized)
            return undefined;
        return new purchase_order_entity_1.PurchaseOrderEntity({
            ...sanitized,
            id: sanitized.id || (0, convert_id_1.convertIdToString)(doc),
        });
    }
    getUserFullName(user) {
        if (!user)
            return undefined;
        const first = (user.firstName || '').trim();
        const last = (user.lastName || '').trim();
        const combined = `${first} ${last}`.trim();
        return combined || user.email || undefined;
    }
    getUserEmail(user) {
        return user?.email;
    }
    getCourseTitle(course) {
        if (!course)
            return undefined;
        if (typeof course === 'string') {
            return course;
        }
        return course.title || undefined;
    }
    async sendSubmissionEmail(po) {
        if (!po)
            return;
        const financeEmail = this.getUserEmail(po.financialContact);
        if (!financeEmail) {
            return;
        }
        await this.mailService.purchaseOrderSubmitted({
            to: financeEmail,
            data: {
                poNumber: po.poNumber,
                studentName: this.getUserFullName(po.student),
                courseTitle: this.getCourseTitle(po.course),
                bankSlipUrl: po.bankSlipUrl,
                submittedAt: po.submittedAt
                    ? new Date(po.submittedAt).toISOString()
                    : undefined,
            },
        });
    }
    async sendDecisionEmail(po) {
        if (!po)
            return;
        const studentEmail = this.getUserEmail(po.student);
        if (!studentEmail) {
            return;
        }
        await this.mailService.purchaseOrderDecision({
            to: studentEmail,
            data: {
                poNumber: po.poNumber,
                courseTitle: this.getCourseTitle(po.course),
                status: po.status,
                decisionNotes: po.decisionNotes,
                reviewedBy: this.getUserFullName(po.financialContact),
            },
        });
        if (po.status === purchase_schema_1.PurchaseOrderStatusEnum.APPROVED) {
            try {
                let course = po.course;
                const student = po.student;
                if (!course?.sessions) {
                    const courseId = course?._id?.toString() ||
                        (typeof course === 'string' ? course : null) ||
                        po.course?.toString();
                    if (courseId) {
                        const fetchedCourse = await this.courseModel
                            .findById(courseId)
                            .select('title slug sessions details price currency')
                            .lean();
                        if (fetchedCourse) {
                            course = fetchedCourse;
                        }
                    }
                }
                const frontendDomain = this.configService.getOrThrow('app.frontendDomain', { infer: true });
                const courseMaterialLink = course?.slug
                    ? `${frontendDomain}/courses/${course.slug}/materials`
                    : `${frontendDomain}/courses/${course?._id?.toString() || po.course}/materials`;
                const courseMaterials = [];
                if (course?.sessions && Array.isArray(course.sessions)) {
                    course.sessions.forEach((session, index) => {
                        courseMaterials.push({
                            name: `Session ${index + 1} - ${session.type || 'Session'}`,
                            type: 'Session',
                            link: `${courseMaterialLink}#session-${index + 1}`,
                        });
                    });
                }
                if (course?.details) {
                    if (course.details.features && course.details.features.length > 0) {
                        courseMaterials.push({
                            name: 'Course Features',
                            type: 'Documentation',
                            link: `${courseMaterialLink}#features`,
                        });
                    }
                }
                const studentName = this.getUserFullName(student) || 'Student';
                const courseTitle = this.getCourseTitle(course) || 'Course';
                const amount = course?.price || 0;
                const currency = course?.currency?.toUpperCase() || 'USD';
                await this.mailService.studentPaymentConfirmation({
                    to: studentEmail,
                    data: {
                        studentName,
                        courseTitle,
                        courseMaterialLink,
                        courseMaterials,
                        amount,
                        currency,
                        paymentDate: new Date().toISOString(),
                    },
                });
            }
            catch (error) {
                console.error('Failed to send course materials email for approved PO:', error.message);
            }
        }
    }
    async create(dto) {
        try {
            const created = await this.purchaseOrderModel.create({
                poNumber: dto.poNumber,
                student: dto.studentId,
                course: dto.courseId,
                financialContact: dto.financialContactId,
                bankSlipUrl: dto.bankSlipUrl,
                submittedAt: dto.submittedAt ? new Date(dto.submittedAt) : new Date(),
                status: purchase_schema_1.PurchaseOrderStatusEnum.PENDING,
                ...(dto.BookingId && { BookingId: new mongoose_3.Types.ObjectId(dto.BookingId) }),
            });
            const existingpurchaseOrder = await this.purchaseOrderModel.findOne({
                student: dto.studentId,
                course: dto.courseId,
                status: purchase_schema_1.PurchaseOrderStatusEnum.PENDING,
            });
            if (existingpurchaseOrder) {
                throw new common_1.BadRequestException('You have already paid for this course');
            }
            const booking = await this.bookingModel.findOne({
                studentId: new mongoose_3.Types.ObjectId(dto.studentId),
                courseId: new mongoose_3.Types.ObjectId(dto.courseId),
            });
            if (booking) {
                booking.status = create_booking_dto_1.BookingStatus.PENDING;
                await booking.save();
            }
            const populated = await this.purchaseOrderModel
                .findById(created._id)
                .populate(this.purchaseOrderPopulate)
                .lean()
                .exec();
            if (populated) {
                await this.sendSubmissionEmail(populated);
                return this.map(populated);
            }
            return this.map(created.toObject());
        }
        catch (error) {
            if (error?.code === 11000) {
                throw new common_1.BadRequestException('Purchase order number already exists');
            }
            throw error;
        }
    }
    async findAll(status, paginationOptions) {
        const filter = status ? { status } : {};
        const page = paginationOptions?.page ?? 1;
        const limit = paginationOptions?.limit ?? 10;
        const skip = (page - 1) * limit;
        const [docs, total] = await Promise.all([
            this.purchaseOrderModel
                .find(filter)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .populate(this.purchaseOrderPopulate)
                .lean()
                .exec(),
            this.purchaseOrderModel.countDocuments(filter).exec(),
        ]);
        const totalPages = Math.ceil(total / limit);
        return {
            data: docs.map((doc) => this.map(doc)),
            totalItems: total,
            totalPages,
            currentPage: page,
            limit,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1,
        };
    }
    async findOne(id) {
        const po = await this.purchaseOrderModel
            .findById(id)
            .populate(this.purchaseOrderPopulate)
            .lean()
            .exec();
        if (!po) {
            throw new common_1.NotFoundException('Purchase order not found');
        }
        return this.map(po);
    }
    async findByUserAndCourse(userId, courseId) {
        const po = await this.purchaseOrderModel
            .findOne({ student: userId, course: courseId })
            .populate(this.purchaseOrderPopulate)
            .lean()
            .exec();
        if (!po) {
            throw new common_1.NotFoundException('Purchase order not found');
        }
        return this.map(po);
    }
    async update(id, dto) {
        const payload = {};
        if (dto.poNumber !== undefined) {
            payload.poNumber = dto.poNumber;
        }
        if (dto.studentId !== undefined) {
            payload.student = dto.studentId;
        }
        if (dto.courseId !== undefined) {
            payload.course = dto.courseId;
        }
        if (dto.financialContactId !== undefined) {
            payload.financialContact = dto.financialContactId;
        }
        if (dto.bankSlipUrl !== undefined) {
            payload.bankSlipUrl = dto.bankSlipUrl;
        }
        if (dto.submittedAt !== undefined) {
            payload.submittedAt = new Date(dto.submittedAt);
        }
        if (dto.status !== undefined) {
            payload.status = dto.status;
            if (dto.status !== purchase_schema_1.PurchaseOrderStatusEnum.PENDING) {
                payload.reviewedAt = dto.reviewedAt
                    ? new Date(dto.reviewedAt)
                    : new Date();
            }
        }
        if (dto.reviewedBy !== undefined) {
            payload.reviewedBy = dto.reviewedBy;
        }
        if (dto.reviewedAt !== undefined) {
            payload.reviewedAt = new Date(dto.reviewedAt);
        }
        if (dto.decisionNotes !== undefined) {
            payload.decisionNotes = dto.decisionNotes;
        }
        try {
            const updated = await this.purchaseOrderModel
                .findByIdAndUpdate(id, payload, { new: true })
                .populate(this.purchaseOrderPopulate)
                .lean()
                .exec();
            if (!updated) {
                throw new common_1.NotFoundException('Purchase order not found');
            }
            if (dto.status && dto.status !== purchase_schema_1.PurchaseOrderStatusEnum.PENDING) {
                await this.sendDecisionEmail(updated);
                if (dto.status === purchase_schema_1.PurchaseOrderStatusEnum.APPROVED) {
                    try {
                        const course = updated.course;
                        const student = updated.student;
                        const courseId = (0, convert_id_1.convertIdToString)(course) || course?._id?.toString();
                        const studentId = (0, convert_id_1.convertIdToString)(student) || student?._id?.toString();
                        const poId = (0, convert_id_1.convertIdToString)(updated) || updated._id?.toString();
                        if (courseId && studentId && poId) {
                            const amount = course?.price || 0;
                            const currency = course?.currency || 'usd';
                            await this.paymentService.createPaymentFromPurchaseOrder(poId, studentId, courseId, amount, currency);
                            const booking = await this.bookingModel.findOne({
                                studentId: new mongoose_3.Types.ObjectId(dto.studentId),
                                courseId: new mongoose_3.Types.ObjectId(dto.courseId),
                            });
                            if (!booking) {
                                return {
                                    statusCode: 400,
                                    message: 'Booking not found',
                                    error: 'Bad Request',
                                };
                            }
                            if (booking) {
                                booking.status = create_booking_dto_1.BookingStatus.CONFIRMED;
                                booking.paymentMethod = create_booking_dto_1.PaymentMethod.PURCHASEORDER;
                                await booking.save();
                            }
                            try {
                                for (const session of course?.sessions) {
                                    const sessionId = session?._id?.toString();
                                    const bookingSessionId = booking?.sessionId?.toString();
                                    if (sessionId === bookingSessionId) {
                                        if (session.timeBlocks && session.timeBlocks.length > 0) {
                                            const firstTimeBlock = session.timeBlocks[0];
                                            await this.classScheduleHelper.addStudentToSchedule(booking.courseId.toString(), booking.studentId.toString(), {
                                                sessionId: sessionId,
                                                instructor: session?.instructor,
                                                date: firstTimeBlock.startDate,
                                                time: firstTimeBlock.startTime,
                                                duration: 60,
                                                timeTableId: booking.timeTableId,
                                            });
                                            console.log('✅ Student added to schedules successfully');
                                        }
                                    }
                                }
                            }
                            catch (error) {
                                console.warn(`Failed to add student to schedules: ${error.message}`);
                            }
                        }
                    }
                    catch (error) {
                        console.error('Failed to create payment from approved PO:', error.message);
                    }
                }
            }
            return this.map(updated);
        }
        catch (error) {
            if (error?.code === 11000) {
                throw new common_1.BadRequestException('Purchase order number already exists');
            }
            throw error;
        }
    }
    async remove(id) {
        const result = await this.purchaseOrderModel
            .findByIdAndDelete(id)
            .lean()
            .exec();
        if (!result) {
            throw new common_1.NotFoundException('Purchase order not found');
        }
        return { deleted: true };
    }
};
exports.PurchaseOrderService = PurchaseOrderService;
exports.PurchaseOrderService = PurchaseOrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(purchase_schema_1.PurchaseOrderSchemaClass.name)),
    __param(3, (0, mongoose_1.InjectModel)(booking_schema_1.Booking.name)),
    __param(5, (0, mongoose_1.InjectModel)(course_schema_1.CourseSchemaClass.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mail_service_1.MailService,
        payment_service_1.PaymentService,
        mongoose_2.Model,
        config_1.ConfigService,
        mongoose_2.Model,
        class_schedule_helper_service_1.ClassScheduleHelperService])
], PurchaseOrderService);
//# sourceMappingURL=purchase.services.js.map