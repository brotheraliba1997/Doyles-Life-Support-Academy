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
var ClassScheduleService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassScheduleService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const class_schedule_schema_1 = require("./schema/class-schedule.schema");
const mongoose_query_builder_1 = require("../utils/mongoose-query-builder");
const mail_service_1 = require("../mail/mail.service");
const config_1 = require("@nestjs/config");
const course_schema_1 = require("../course/schema/course.schema");
const notification_schema_1 = require("../notification/schema/notification.schema");
const convert_id_1 = require("../utils/convert-id");
let ClassScheduleService = ClassScheduleService_1 = class ClassScheduleService {
    constructor(classScheduleModel, notificationModel, courseModel, mailService, configService, oauth2Client) {
        this.classScheduleModel = classScheduleModel;
        this.notificationModel = notificationModel;
        this.courseModel = courseModel;
        this.mailService = mailService;
        this.configService = configService;
        this.oauth2Client = oauth2Client;
        this.logger = new common_1.Logger(ClassScheduleService_1.name);
    }
    map(doc) {
        if (!doc)
            return undefined;
        const id = typeof doc.id !== 'undefined' ? doc.id : doc._id?.toString?.();
        const sanitizedDoc = (0, convert_id_1.sanitizeMongooseDocument)(doc);
        return {
            id,
            course: {
                ...sanitizedDoc.course,
                sessions: sanitizedDoc.course.sessions?.map((session) => ({
                    ...session,
                    instructor: session?.instructor?._doc
                        ? session?.instructor?._doc
                        : session.instructor,
                })),
            },
            sessionId: sanitizedDoc.sessionId,
            instructor: sanitizedDoc.instructor,
            students: sanitizedDoc.students,
            date: sanitizedDoc.date,
            time: sanitizedDoc.time,
            duration: sanitizedDoc.duration,
            googleMeetLink: sanitizedDoc.googleMeetLink,
            securityKey: sanitizedDoc.securityKey,
            status: sanitizedDoc.status,
            progress: sanitizedDoc.progress,
            startedAt: sanitizedDoc.startedAt,
            endedAt: sanitizedDoc.endedAt,
            isCompleted: sanitizedDoc.isCompleted,
            ClassLeftList: sanitizedDoc.ClassLeftList,
            googleCalendarEventLink: sanitizedDoc.googleCalendarEventLink,
            createdAt: sanitizedDoc.createdAt,
            updatedAt: sanitizedDoc.updatedAt,
            deletedAt: sanitizedDoc.deletedAt,
        };
    }
    async create(dto, accessToken, refreshToken) {
        const studentIds = Array.isArray(dto.students)
            ? dto.students
            : [dto.students];
        const duplicateSchedule = await this.classScheduleModel.findOne({
            course: new mongoose_2.Types.ObjectId(dto.course),
            students: { $in: studentIds },
        });
        if (duplicateSchedule) {
            throw new common_1.BadRequestException('student already added in this schedule');
        }
        const schedules = await this.classScheduleModel.findOne({
            course: new mongoose_2.Types.ObjectId(dto.course),
        });
        const studentId = Array.isArray(dto.students)
            ? dto.students[0]
            : dto.students;
        if (!studentId) {
            throw new common_1.BadRequestException('Student ID is required');
        }
        let schedule = null;
        if (schedules) {
            if (schedules.students.length > 0 &&
                schedules.students.some((s) => s?.id?.toString() === studentId?.toString())) {
                return this.map(schedules.toObject());
            }
            schedules.students.push(new mongoose_2.Types.ObjectId(studentId));
            await schedules.save();
            schedule = schedules;
        }
        else {
            schedule = await this.classScheduleModel.create({
                ...dto,
                course: new mongoose_2.Types.ObjectId(dto?.course),
                students: [new mongoose_2.Types.ObjectId(studentId)],
            });
        }
        const alreadyExistsNotification = await this.notificationModel.findOne({
            receiverIds: { $in: studentIds },
            type: 'class_schedules',
            'meta.courseId': dto.course,
        });
        if (alreadyExistsNotification) {
            await this.notificationModel.updateOne({ _id: alreadyExistsNotification._id }, {
                $addToSet: { receiverIds: { $each: studentIds } },
            });
        }
        else {
            await this.notificationModel.create({
                receiverIds: studentIds,
                type: 'class_schedules',
                title: 'Class Schedule Created',
                message: 'A new class schedule has been created',
                meta: { courseId: dto.course },
            });
        }
        return this.map(schedule.toObject());
    }
    async findManyWithPagination({ filterOptions, sortOptions, paginationOptions, }) {
        console.log('Filter Options:', filterOptions);
        const filterQueryBuilder = new mongoose_query_builder_1.FilterQueryBuilder()
            .addEqual('course', filterOptions?.courseId)
            .addEqual('status', filterOptions?.status);
        if (filterOptions?.studentId) {
            filterQueryBuilder.addCustom('students', {
                $in: filterOptions?.studentId,
            });
        }
        if (filterOptions?.startDate || filterOptions?.endDate) {
            const dateFilter = {};
            if (filterOptions.startDate)
                dateFilter.$gte = filterOptions.startDate;
            if (filterOptions.endDate)
                dateFilter.$lte = filterOptions.endDate;
            filterQueryBuilder.addCustom('date', dateFilter);
        }
        if (filterOptions?.search) {
            filterQueryBuilder.addCustom('$or', [
                { googleMeetLink: { $regex: filterOptions.search, $options: 'i' } },
                { securityKey: { $regex: filterOptions.search, $options: 'i' } },
                { 'course.title': { $regex: filterOptions.search, $options: 'i' } },
            ]);
        }
        const filterQuery = filterQueryBuilder.build();
        if (filterOptions?.instructorId) {
            const instructorObjectId = new mongoose_2.Types.ObjectId(filterOptions.instructorId);
            const page = paginationOptions.page || 1;
            const limit = paginationOptions.limit || 10;
            const skip = (page - 1) * limit;
            const allSchedules = await this.classScheduleModel
                .find(filterQuery)
                .populate({
                path: 'course',
                populate: {
                    path: 'sessions',
                    populate: {
                        path: 'instructor',
                        select: 'firstName lastName email',
                    },
                },
            })
                .populate('students', 'firstName lastName email')
                .lean();
            const filteredSchedules = allSchedules.filter((schedule) => {
                if (!schedule.course?.sessions)
                    return false;
                return schedule.course.sessions.some((session) => session.instructor?._id?.toString() ===
                    instructorObjectId.toString() ||
                    session.instructor?.toString() === instructorObjectId.toString());
            });
            console.log(`Total schedules: ${allSchedules.length}, Filtered: ${filteredSchedules.length}`);
            const paginatedSchedules = filteredSchedules.slice(skip, skip + limit);
            const mappedResults = paginatedSchedules.map((doc) => this.map(doc));
            return {
                data: mappedResults,
                totalItems: filteredSchedules.length,
                limit,
                hasNextPage: skip + limit < filteredSchedules.length,
                hasPreviousPage: skip > 0,
                totalPages: Math.ceil(filteredSchedules.length / limit),
                currentPage: page,
            };
        }
        return (0, mongoose_query_builder_1.buildMongooseQuery)({
            model: this.classScheduleModel,
            filterQuery,
            sortOptions,
            paginationOptions,
            populateFields: [
                {
                    path: 'course',
                    populate: {
                        path: 'sessions',
                        populate: {
                            path: 'instructor',
                            select: 'firstName lastName email',
                        },
                    },
                },
                { path: 'students', select: 'firstName lastName email' },
            ],
            mapper: (doc) => this.map(doc),
        });
    }
    async findAll(userData) {
        if (userData?.role === 1) {
            const schedules = await this.classScheduleModel
                .find({})
                .populate({
                path: 'course',
                populate: {
                    path: 'sessions',
                    populate: {
                        path: 'instructor',
                        select: 'firstName lastName email',
                    },
                },
            })
                .populate('students', 'firstName lastName email')
                .lean();
            const mappedData = schedules.map((doc) => {
                const mapped = this.map(doc);
                if (mapped?.id) {
                    mapped.id = (0, convert_id_1.convertIdToString)(mapped) || mapped.id.toString();
                }
                return mapped;
            });
            return {
                message: 'Class schedules fetched successfully',
                total: schedules.length,
                data: mappedData,
            };
        }
        const schedules = await this.classScheduleModel
            .find({})
            .populate({ path: 'course' })
            .populate('students', 'firstName lastName email')
            .lean();
        const userId = userData?.id?.toString();
        const schedulesWithSession = schedules.filter((schedule) => {
            if (!schedule.course?.sessions || !userId)
                return false;
            return schedule.course.sessions.some((session) => {
                if (session.instructor?.toString() === userId) {
                    return true;
                }
                return schedule.students?.some((student) => student._id?.toString() === userId);
            });
        });
        const mappedData = schedulesWithSession.map((schedule) => {
            const mapped = this.map(schedule);
            if (mapped?.id) {
                mapped.id = (0, convert_id_1.convertIdToString)(mapped) || mapped.id.toString();
            }
            return mapped;
        });
        return {
            message: 'Class schedules fetched successfully',
            total: mappedData.length,
            data: mappedData,
        };
    }
    async findOne(id) {
        const schedule = await this.classScheduleModel
            .findById(id)
            .populate([
            { path: 'course' },
            { path: 'students', select: 'firstName lastName email' },
        ])
            .lean();
        if (!schedule)
            throw new common_1.NotFoundException('Class schedule not found');
        return this.map(schedule);
    }
    async update(id, dto) {
        const studentIds = Array.isArray(dto.students)
            ? dto.students
            : [dto.students];
        const duplicateSchedule = await this.classScheduleModel.findOne({
            course: new mongoose_2.Types.ObjectId(dto.course),
            students: { $in: studentIds },
        });
        if (duplicateSchedule) {
            throw new common_1.BadRequestException('Schedule already exists for this student');
        }
        const updated = await this.classScheduleModel
            .findByIdAndUpdate(id, dto, { new: true })
            .populate([
            { path: 'course', select: 'title price' },
            { path: 'students', select: 'firstName lastName email' },
        ])
            .lean();
        if (!updated)
            throw new common_1.NotFoundException('Class schedule not founds');
        return this.map(updated);
    }
    async updateUserStatus(id, userId, status) {
        console.log(`Updating status for user ${userId} in schedule ${id} to ${status}`);
        const schedule = await this.classScheduleModel
            .findOne({ course: new mongoose_2.Types.ObjectId(id) })
            .lean();
        const updated = await this.classScheduleModel
            .findByIdAndUpdate(schedule._id, { $set: { 'students.$[elem].status': status } }, {
            new: true,
            arrayFilters: [{ 'elem.id': userId }],
        })
            .populate([
            { path: 'course', select: 'title price' },
            { path: 'students', select: 'firstName lastName email' },
        ])
            .lean();
        if (!updated)
            throw new common_1.NotFoundException('Class schedule not founds');
        return this.map(updated);
    }
    async remove(id) {
        const deleted = await this.classScheduleModel.findByIdAndDelete(id);
        if (!deleted)
            throw new common_1.NotFoundException('Class schedule not found');
        return { message: 'Class schedule deleted successfully' };
    }
    async joinClass(securityKey) {
        const schedule = await this.classScheduleModel
            .findOne({ securityKey })
            .populate('course');
        if (!schedule)
            throw new common_1.NotFoundException('Invalid security key');
        const now = new Date();
        const classDateTime = new Date(`${schedule.date}T${schedule.time}:00`);
        if (now < classDateTime) {
            throw new common_1.BadRequestException('Class has not started yet');
        }
        if (schedule.status === 'scheduled') {
            schedule.status = 'ongoing';
            await schedule.save();
        }
        return {
            message: 'Class joined successfully',
            meetLink: schedule.googleMeetLink,
            data: {
                course: schedule.course,
                date: schedule.date,
                time: schedule.time,
            },
        };
    }
};
exports.ClassScheduleService = ClassScheduleService;
exports.ClassScheduleService = ClassScheduleService = ClassScheduleService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(class_schedule_schema_1.ClassScheduleSchemaClass.name)),
    __param(1, (0, mongoose_1.InjectModel)(notification_schema_1.Notification.name)),
    __param(2, (0, mongoose_1.InjectModel)(course_schema_1.CourseSchemaClass.name)),
    __param(5, (0, common_1.Inject)('GOOGLE_OAUTH2_CLIENT')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mail_service_1.MailService,
        config_1.ConfigService, Object])
], ClassScheduleService);
//# sourceMappingURL=class-schedule.service.js.map