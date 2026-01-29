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
var ClassScheduleHelperService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassScheduleHelperService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const class_schedule_schema_1 = require("../../classSchedule/schema/class-schedule.schema");
const course_schema_1 = require("../../course/schema/course.schema");
let ClassScheduleHelperService = ClassScheduleHelperService_1 = class ClassScheduleHelperService {
    constructor(classScheduleModel, courseModel) {
        this.classScheduleModel = classScheduleModel;
        this.courseModel = courseModel;
        this.logger = new common_1.Logger(ClassScheduleHelperService_1.name);
    }
    async addStudentToSchedule(courseId, studentId, scheduleData) {
        console.log('courseId', courseId);
        const existingSchedule = await this.classScheduleModel.findOne({
            course: new mongoose_2.Types.ObjectId(courseId),
        });
        let schedule = null;
        if (existingSchedule) {
            if (existingSchedule.students.length > 0 &&
                existingSchedule.students.some((s) => s?.toString() === studentId?.toString())) {
                throw new common_1.BadRequestException(`Student ${studentId} is already added in schedule ${existingSchedule._id}`);
            }
            existingSchedule.students.push(new mongoose_2.Types.ObjectId(studentId));
            await existingSchedule.save();
            this.logger.log(`✅ Student ${studentId} added to schedule ${existingSchedule._id}`);
            schedule = existingSchedule;
        }
        else {
            let classLeftList = [];
            if (scheduleData?.sessionId) {
                try {
                    const course = await this.courseModel.findById(courseId).lean();
                    if (course && course.sessions) {
                        for (const session of course?.sessions) {
                            if (session && session.timeBlocks) {
                                const timeBlocksCount = session.timeBlocks.length;
                                console.log('timeBlocksCount', timeBlocksCount);
                                classLeftList = Array(timeBlocksCount).fill(false);
                                this.logger.log(`📋 ClassLeftList initialized with ${timeBlocksCount} timeBlocks`);
                            }
                        }
                    }
                }
                catch (error) {
                    this.logger.warn(`⚠️ Could not initialize ClassLeftList: ${error.message}`);
                }
            }
            schedule = await this.classScheduleModel.create({
                ...scheduleData,
                course: new mongoose_2.Types.ObjectId(courseId),
                students: [new mongoose_2.Types.ObjectId(studentId)],
                ClassLeftList: classLeftList.length > 0 ? classLeftList : undefined,
                isCompleted: false,
            });
            this.logger.log(`✅ New schedule created with student ${studentId}`);
        }
        return schedule;
    }
};
exports.ClassScheduleHelperService = ClassScheduleHelperService;
exports.ClassScheduleHelperService = ClassScheduleHelperService = ClassScheduleHelperService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(class_schedule_schema_1.ClassScheduleSchemaClass.name)),
    __param(1, (0, mongoose_1.InjectModel)(course_schema_1.CourseSchemaClass.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], ClassScheduleHelperService);
//# sourceMappingURL=class-schedule-helper.service.js.map