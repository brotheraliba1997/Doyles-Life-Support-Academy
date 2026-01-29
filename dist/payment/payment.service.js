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
var PaymentService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const config_1 = require("@nestjs/config");
const payment_schema_1 = require("./schema/payment.schema");
const stripe_service_1 = require("../stripe/stripe.service");
const mail_service_1 = require("../mail/mail.service");
const enrollments_schema_1 = require("../Enrollment/infrastructure/enrollments.schema");
const class_schedule_helper_service_1 = require("../utils/class-schedule/class-schedule-helper.service");
const course_schema_1 = require("../course/schema/course.schema");
const user_schema_1 = require("../users/schema/user.schema");
const booking_schema_1 = require("../booking/schema/booking.schema");
const create_booking_dto_1 = require("../booking/dto/create-booking.dto");
let PaymentService = PaymentService_1 = class PaymentService {
    constructor(paymentModel, courseModel, userModel, bookingModel, enrollmentModel, stripeService, mailService, configService, classScheduleHelper) {
        this.paymentModel = paymentModel;
        this.courseModel = courseModel;
        this.userModel = userModel;
        this.bookingModel = bookingModel;
        this.enrollmentModel = enrollmentModel;
        this.stripeService = stripeService;
        this.mailService = mailService;
        this.configService = configService;
        this.classScheduleHelper = classScheduleHelper;
        this.logger = new common_1.Logger(PaymentService_1.name);
    }
    async createPayment(userId, createPaymentDto) {
        const { courseId, amount, currency = 'usd', metadata, BookingId, } = createPaymentDto;
        const course = await this.courseModel.findById(courseId);
        if (!course) {
            throw new common_1.NotFoundException('Course not found');
        }
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const existingPayment = await this.paymentModel.findOne({
            userId: userId,
            courseId: courseId,
            status: { $in: [payment_schema_1.PaymentStatus.SUCCEEDED, payment_schema_1.PaymentStatus.PROCESSING] },
        });
        if (existingPayment) {
            throw new common_1.BadRequestException('You have already paid for this course');
        }
        const existingEnrollment = await this.enrollmentModel.findOne({
            user: user,
            course: course,
            status: { $in: ['active', 'completed'] },
        });
        if (existingEnrollment) {
            throw new common_1.BadRequestException('User already enrolled in this course');
        }
        const paymentAmount = amount || course.price || 0;
        if (paymentAmount <= 0) {
            throw new common_1.BadRequestException('Invalid payment amount');
        }
        const amountInCents = Math.round(paymentAmount * 100);
        const payment = new this.paymentModel({
            courseId: course?._id.toString(),
            userId: user?._id.toString(),
            amount: paymentAmount,
            currency,
            status: payment_schema_1.PaymentStatus.PENDING,
            description: `Payment for course: ${course.title}`,
            ...(BookingId && { BookingId: new mongoose_2.Types.ObjectId(BookingId) }),
            metadata: {
                ...metadata,
                courseName: course.title,
                userName: user.firstName + ' ' + user.lastName,
                userEmail: user.email,
            },
        });
        await payment.save();
        try {
            const paymentIntent = await this.stripeService.createPaymentIntent({
                amount: amountInCents,
                currency,
                courseId: course?._id.toString(),
                userId: user?._id.toString(),
                description: `Payment for ${course.title}`,
            });
            payment.stripePaymentIntentId = paymentIntent.paymentIntentId;
            payment.status = payment_schema_1.PaymentStatus.SUCCEEDED;
            const booking = await this.bookingModel.findOne({
                studentId: new mongoose_2.Types.ObjectId(payment.userId),
                courseId: new mongoose_2.Types.ObjectId(payment.courseId),
            });
            if (!booking) {
                return {
                    statusCode: 400,
                    message: 'Booking not found',
                    error: 'Bad Reques',
                };
            }
            console.log(booking, 'working');
            booking.status = create_booking_dto_1.BookingStatus.CONFIRMED;
            booking.paymentMethod = create_booking_dto_1.PaymentMethod.STRIPE;
            await booking.save();
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
                            console.log('✅ Student added to schedule successfully');
                        }
                    }
                }
            }
            catch (error) {
                console.warn(`Failed to add student to schedule: ${error.message}`);
            }
            await payment.save();
            this.logger.log(`Payment intent created: ${paymentIntent.paymentIntentId} for user ${userId}`);
            try {
                const financeEmail = this.configService.get('app.adminEmail', { infer: true }) ||
                    this.configService.get('mail.defaultEmail', { infer: true });
                if (financeEmail) {
                    await this.mailService.paymentConfirmation({
                        to: financeEmail,
                        data: {
                            paymentId: payment._id.toString(),
                            paymentIntentId: paymentIntent.paymentIntentId,
                            studentName: `${user.firstName} ${user.lastName}`,
                            studentEmail: user.email,
                            courseTitle: course.title,
                            amount: paymentAmount,
                            currency: currency.toUpperCase(),
                            paymentMethod: 'stripe',
                            createdAt: new Date().toISOString(),
                        },
                    });
                    this.logger.log(`Payment confirmation email sent to finance: ${financeEmail}`);
                }
            }
            catch (emailError) {
                this.logger.error(`Failed to send payment confirmation email to finance: ${emailError.message}`);
            }
            return {
                payment: payment.toObject(),
                clientSecret: paymentIntent.clientSecret,
                paymentIntentId: paymentIntent.paymentIntentId,
            };
        }
        catch (error) {
            payment.status = payment_schema_1.PaymentStatus.FAILED;
            payment.failureReason = error.message;
            await payment.save();
            this.logger.error(`Failed to create payment intent: ${error.message}`);
            throw new common_1.BadRequestException('Failed to create payment');
        }
    }
    async confirmPayment(paymentIntentId) {
        const payment = await this.paymentModel
            .findOne({
            stripePaymentIntentId: paymentIntentId,
        })
            .populate('userId', 'firstName lastName email')
            .populate('courseId', 'title slug sessions details');
        if (!payment) {
            throw new common_1.NotFoundException('Payment not found');
        }
        payment.status = payment_schema_1.PaymentStatus.SUCCEEDED;
        payment.paidAt = new Date();
        await payment.save();
        let user = payment.userId;
        let course = payment.courseId;
        if (!user?.email) {
            const userId = user?._id?.toString() ||
                (typeof user === 'string' ? user : null) ||
                payment.userId?.toString();
            if (userId) {
                const fetchedUser = await this.userModel
                    .findById(userId)
                    .select('firstName lastName email')
                    .lean();
                if (fetchedUser) {
                    user = fetchedUser;
                }
            }
        }
        if (!course?.title) {
            const courseId = course?._id?.toString() ||
                (typeof course === 'string' ? course : null) ||
                payment.courseId?.toString();
            if (courseId) {
                const fetchedCourse = await this.courseModel
                    .findById(courseId)
                    .select('title slug sessions details')
                    .lean();
                if (fetchedCourse) {
                    course = fetchedCourse;
                }
            }
        }
        const frontendDomain = this.configService.getOrThrow('app.frontendDomain', {
            infer: true,
        });
        const courseMaterialLink = course?.slug
            ? `${frontendDomain}/courses/${course.slug}/materials`
            : `${frontendDomain}/courses/${course?._id?.toString() || payment.courseId}/materials`;
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
        try {
            if (user?.email) {
                await this.mailService.studentPaymentConfirmation({
                    to: user.email,
                    data: {
                        studentName: `${user.firstName || ''} ${user.lastName || ''}`.trim() ||
                            'Student',
                        courseTitle: course?.title || 'Course',
                        courseMaterialLink,
                        courseMaterials,
                        amount: payment.amount,
                        currency: payment.currency?.toUpperCase() || 'USD',
                        paymentDate: new Date().toISOString(),
                    },
                });
                this.logger.log(`Payment confirmation email sent to student: ${user.email}`);
            }
        }
        catch (emailError) {
            this.logger.error(`Failed to send payment confirmation email to student: ${emailError.message}`);
        }
        return {
            success: true,
            message: 'Payment confirmed',
            payment: {
                id: payment._id.toString(),
                status: payment.status,
                amount: payment.amount,
                currency: payment.currency,
                paidAt: payment.paidAt,
            },
            course: {
                id: course?._id?.toString() || payment.courseId,
                title: course?.title,
                slug: course?.slug,
            },
            courseMaterialLink,
            courseMaterials,
        };
    }
    async createCheckout(userId, createCheckoutDto) {
        const { courseId, successUrl, cancelUrl, metadata, BookingId } = createCheckoutDto;
        const course = await this.courseModel.findById(courseId);
        if (!course) {
            throw new common_1.NotFoundException('Course not found');
        }
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const existingEnrollment = await this.enrollmentModel.findOne({
            user: new mongoose_2.Types.ObjectId(userId),
            course: new mongoose_2.Types.ObjectId(courseId),
            status: { $in: ['active', 'completed'] },
        });
        if (existingEnrollment) {
            throw new common_1.BadRequestException('User already enrolled in this course');
        }
        const paymentAmount = course.price || 0;
        if (paymentAmount <= 0) {
            throw new common_1.BadRequestException('Invalid course price');
        }
        const amountInCents = Math.round(paymentAmount * 100);
        const payment = new this.paymentModel({
            user: new mongoose_2.Types.ObjectId(userId),
            course: new mongoose_2.Types.ObjectId(courseId),
            amount: paymentAmount,
            currency: 'usd',
            status: payment_schema_1.PaymentStatus.PENDING,
            description: `Payment for course: ${course.title}`,
            ...(BookingId && { BookingId: new mongoose_2.Types.ObjectId(BookingId) }),
            metadata: {
                ...metadata,
                courseName: course.title,
                userName: user.firstName + ' ' + user.lastName,
                userEmail: user.email,
            },
        });
        await payment.save();
        try {
            const checkoutDto = {
                courseId,
                userId,
                successUrl,
                cancelUrl,
                priceInCents: amountInCents,
            };
            const session = await this.stripeService.createCheckoutSession(checkoutDto, course.title, paymentAmount);
            payment.metadata = {
                ...payment.metadata,
                checkoutSessionId: session.sessionId,
            };
            await payment.save();
            this.logger.log(`Checkout session created: ${session.sessionId} for user ${userId}`);
            return {
                payment: payment.toObject(),
                sessionId: session.sessionId,
                url: session.url,
            };
        }
        catch (error) {
            payment.status = payment_schema_1.PaymentStatus.FAILED;
            payment.failureReason = error.message;
            await payment.save();
            this.logger.error(`Failed to create checkout session: ${error.message}`);
            throw new common_1.BadRequestException('Failed to create checkout session');
        }
    }
    async handlePaymentSuccess(paymentIntentId) {
        const payment = await this.paymentModel
            .findOne({ stripePaymentIntentId: paymentIntentId })
            .populate('userId')
            .populate('courseId');
        if (!payment) {
            this.logger.warn(`Payment not found for intent: ${paymentIntentId}`);
            return;
        }
        payment.status = payment_schema_1.PaymentStatus.SUCCEEDED;
        payment.paidAt = new Date();
        await payment.save();
        try {
            const enrollment = new this.enrollmentModel({
                user: payment.userId,
                course: payment.courseId,
                status: 'active',
                enrolledAt: new Date(),
                paymentStatus: 'paid',
            });
            await enrollment.save();
            payment.enrollment = enrollment._id;
            await payment.save();
            this.logger.log(`Enrollment created for user ${payment.userId} in course ${payment.courseId}`);
            const user = payment.userId;
            const course = payment.courseId;
            try {
                await this.mailService.userRegistered({
                    to: user.email,
                    data: {
                        userName: user.name || 'User',
                        userEmail: user.email,
                        registrationDate: new Date().toISOString(),
                    },
                });
                this.logger.log(`Payment confirmation email sent to ${user.email}`);
            }
            catch (emailError) {
                this.logger.error(`Failed to send payment confirmation email: ${emailError.message}`);
            }
        }
        catch (error) {
            this.logger.error(`Failed to create enrollment for payment ${payment._id}: ${error.message}`);
            throw error;
        }
    }
    async handlePaymentFailed(paymentIntentId, reason) {
        const payment = await this.paymentModel.findOne({
            stripePaymentIntentId: paymentIntentId,
        });
        if (!payment) {
            this.logger.warn(`Payment not found for intent: ${paymentIntentId}`);
            return;
        }
        payment.status = payment_schema_1.PaymentStatus.FAILED;
        payment.failureReason = reason;
        await payment.save();
        this.logger.log(`Payment failed: ${payment._id}, reason: ${reason}`);
    }
    async refundPayment(refundDto) {
        const { paymentId, amount, reason } = refundDto;
        const payment = await this.paymentModel
            .findById(paymentId)
            .populate('userId')
            .populate('courseId')
            .populate('enrollment');
        if (!payment) {
            throw new common_1.NotFoundException('Payment not found');
        }
        if (payment.status !== payment_schema_1.PaymentStatus.SUCCEEDED) {
            throw new common_1.BadRequestException('Only successful payments can be refunded');
        }
        if (!payment.stripePaymentIntentId) {
            throw new common_1.BadRequestException('No Stripe payment intent found');
        }
        const refundAmount = amount || payment.amount;
        if (refundAmount > payment.amount) {
            throw new common_1.BadRequestException('Refund amount cannot exceed payment amount');
        }
        try {
            const refund = await this.stripeService.createRefund(payment.stripePaymentIntentId, Math.round(refundAmount * 100));
            payment.status = payment_schema_1.PaymentStatus.REFUNDED;
            payment.refundedAmount = refundAmount;
            payment.refundedAt = new Date();
            payment.metadata = {
                ...payment.metadata,
                refundId: refund.id,
                refundReason: reason,
            };
            await payment.save();
            if (payment.enrollment) {
                await this.enrollmentModel.findByIdAndUpdate(payment.enrollment, {
                    status: 'cancelled',
                    paymentStatus: 'refunded',
                });
            }
            this.logger.log(`Payment refunded: ${payment._id}, amount: ${refundAmount}`);
            const user = payment.userId;
            const course = payment.courseId;
            try {
                await this.mailService.userRegistered({
                    to: user.email,
                    data: {
                        userName: user.name || 'User',
                        userEmail: user.email,
                        registrationDate: new Date().toISOString(),
                    },
                });
            }
            catch (emailError) {
                this.logger.error(`Failed to send refund email: ${emailError.message}`);
            }
            return {
                payment: payment.toObject(),
                refund,
            };
        }
        catch (error) {
            this.logger.error(`Failed to refund payment: ${error.message}`);
            throw new common_1.BadRequestException(`Failed to process refund: ${error.message}`);
        }
    }
    async getPayment(paymentId) {
        const payment = await this.paymentModel
            .findById(paymentId)
            .populate('userId', 'firstName lastName email')
            .populate('courseId', 'title description price')
            .populate('enrollment');
        if (!payment) {
            throw new common_1.NotFoundException('Payment not found');
        }
        return payment;
    }
    async findByUserAndCourse(userId, courseId) {
        const payment = await this.paymentModel
            .findOne({
            userId: userId,
            courseId: courseId,
        })
            .populate('userId', 'firstName lastName email')
            .populate('courseId', 'title description price')
            .populate('enrollment');
        if (!payment) {
            throw new common_1.NotFoundException('Payment not found');
        }
        return payment;
    }
    async getUserPayments(userId, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [payments, total] = await Promise.all([
            this.paymentModel
                .find({ userId: new mongoose_2.Types.ObjectId(userId) })
                .populate('courseId', 'title description price')
                .populate('enrollment')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            this.paymentModel.countDocuments({ userId: new mongoose_2.Types.ObjectId(userId) }),
        ]);
        return {
            data: payments,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async getCoursePayments(courseId, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [payments, total] = await Promise.all([
            this.paymentModel
                .find({ courseId: new mongoose_2.Types.ObjectId(courseId) })
                .populate('userId', 'firstName lastName email')
                .populate('enrollment')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            this.paymentModel.countDocuments({
                course: new mongoose_2.Types.ObjectId(courseId),
            }),
        ]);
        return {
            data: payments,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async getAllPayments(page = 1, limit = 10, status) {
        const skip = (page - 1) * limit;
        const filter = status ? { status } : {};
        const [payments, total] = await Promise.all([
            this.paymentModel
                .find(filter)
                .populate('userId', 'firstName lastName email')
                .populate('courseId', 'title description price')
                .populate('enrollment')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            this.paymentModel.countDocuments(filter),
        ]);
        return {
            data: payments,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async createPaymentFromPurchaseOrder(purchaseOrderId, userId, courseId, amount, currency = 'usd') {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const course = await this.courseModel.findById(courseId);
        if (!course) {
            throw new common_1.NotFoundException('Course not found');
        }
        const existingEnrollment = await this.enrollmentModel.findOne({
            user: new mongoose_2.Types.ObjectId(userId),
            course: new mongoose_2.Types.ObjectId(courseId),
            status: { $in: ['active', 'completed'] },
        });
        if (existingEnrollment) {
            throw new common_1.BadRequestException('User already enrolled in this course');
        }
        const payment = new this.paymentModel({
            user: new mongoose_2.Types.ObjectId(userId),
            course: new mongoose_2.Types.ObjectId(courseId),
            amount,
            currency,
            status: payment_schema_1.PaymentStatus.SUCCEEDED,
            paymentMethod: payment_schema_1.PaymentMethod.PURCHASE_ORDER,
            purchaseOrderId: new mongoose_2.Types.ObjectId(purchaseOrderId),
            description: `Payment via Purchase Order for course: ${course.title}`,
            paidAt: new Date(),
            metadata: {
                courseName: course.title,
                userName: `${user.firstName} ${user.lastName}`,
                userEmail: user.email,
                paymentMethod: 'purchase_order',
            },
        });
        await payment.save();
        try {
            const enrollment = new this.enrollmentModel({
                user: new mongoose_2.Types.ObjectId(userId),
                course: new mongoose_2.Types.ObjectId(courseId),
                status: 'active',
                enrolledAt: new Date(),
                paymentStatus: 'paid',
            });
            await enrollment.save();
            payment.enrollment = enrollment._id;
            await payment.save();
            this.logger.log(`Payment and enrollment created from PO ${purchaseOrderId} for user ${userId} in course ${courseId}`);
            return {
                payment: payment.toObject(),
                enrollment: enrollment.toObject(),
            };
        }
        catch (error) {
            payment.status = payment_schema_1.PaymentStatus.FAILED;
            payment.failureReason = error.message;
            await payment.save();
            this.logger.error(`Failed to create enrollment from PO payment: ${error.message}`);
            throw error;
        }
    }
    async getPaymentStats() {
        const [totalRevenue, totalPayments, successfulPayments, failedPayments] = await Promise.all([
            this.paymentModel.aggregate([
                { $match: { status: payment_schema_1.PaymentStatus.SUCCEEDED } },
                { $group: { _id: null, total: { $sum: '$amount' } } },
            ]),
            this.paymentModel.countDocuments(),
            this.paymentModel.countDocuments({ status: payment_schema_1.PaymentStatus.SUCCEEDED }),
            this.paymentModel.countDocuments({ status: payment_schema_1.PaymentStatus.FAILED }),
        ]);
        return {
            totalRevenue: totalRevenue[0]?.total || 0,
            totalPayments,
            successfulPayments,
            failedPayments,
            successRate: totalPayments > 0
                ? ((successfulPayments / totalPayments) * 100).toFixed(2)
                : 0,
        };
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = PaymentService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(payment_schema_1.Payment.name)),
    __param(1, (0, mongoose_1.InjectModel)(course_schema_1.CourseSchemaClass.name)),
    __param(2, (0, mongoose_1.InjectModel)(user_schema_1.UserSchemaClass.name)),
    __param(3, (0, mongoose_1.InjectModel)(booking_schema_1.Booking.name)),
    __param(4, (0, mongoose_1.InjectModel)(enrollments_schema_1.EnrollmentSchemaClass.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        stripe_service_1.StripeService,
        mail_service_1.MailService,
        config_1.ConfigService,
        class_schedule_helper_service_1.ClassScheduleHelperService])
], PaymentService);
//# sourceMappingURL=payment.service.js.map