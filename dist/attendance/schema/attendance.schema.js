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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceSchema = exports.AttendanceSchemaClass = exports.AttendanceStatusEnum = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const document_entity_helper_1 = require("../../utils/document-entity-helper");
const course_schema_1 = require("../../course/schema/course.schema");
const user_schema_1 = require("../../users/schema/user.schema");
const class_schedule_schema_1 = require("../../classSchedule/schema/class-schedule.schema");
var AttendanceStatusEnum;
(function (AttendanceStatusEnum) {
    AttendanceStatusEnum["PRESENT"] = "present";
    AttendanceStatusEnum["ABSENT"] = "absent";
})(AttendanceStatusEnum || (exports.AttendanceStatusEnum = AttendanceStatusEnum = {}));
let AttendanceSchemaClass = class AttendanceSchemaClass extends document_entity_helper_1.EntityDocumentHelper {
};
exports.AttendanceSchemaClass = AttendanceSchemaClass;
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Types.ObjectId,
        ref: class_schedule_schema_1.ClassScheduleSchemaClass.name,
        required: true,
        index: true,
        description: 'Class Schedule ID reference',
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], AttendanceSchemaClass.prototype, "classScheduleId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Types.ObjectId,
        ref: course_schema_1.CourseSchemaClass.name,
        required: true,
        index: true,
        description: 'Course ID - sessions array is inside course',
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], AttendanceSchemaClass.prototype, "courseId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Types.ObjectId,
        required: true,
        description: 'Session ID from course.sessions array (ObjectId)',
        index: true,
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], AttendanceSchemaClass.prototype, "sessionId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Types.ObjectId,
        ref: user_schema_1.UserSchemaClass.name,
        required: true,
        index: true,
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], AttendanceSchemaClass.prototype, "student", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Types.ObjectId,
        ref: user_schema_1.UserSchemaClass.name,
        required: true,
        description: 'Instructor who marked the attendance',
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], AttendanceSchemaClass.prototype, "markedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        trim: true,
        description: '2025-12-09',
    }),
    __metadata("design:type", String)
], AttendanceSchemaClass.prototype, "startDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        trim: true,
        description: '14:00',
    }),
    __metadata("design:type", String)
], AttendanceSchemaClass.prototype, "startTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: Object.values(AttendanceStatusEnum),
        default: AttendanceStatusEnum.ABSENT,
        required: true,
    }),
    __metadata("design:type", String)
], AttendanceSchemaClass.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        trim: true,
        description: 'Optional notes or remarks about attendance',
    }),
    __metadata("design:type", String)
], AttendanceSchemaClass.prototype, "notes", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Date,
        default: () => new Date(),
        description: 'Timestamp when attendance was marked',
    }),
    __metadata("design:type", Date)
], AttendanceSchemaClass.prototype, "markedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        trim: true,
        description: 'Certificate PDF URL',
    }),
    __metadata("design:type", String)
], AttendanceSchemaClass.prototype, "certificateUrl", void 0);
exports.AttendanceSchemaClass = AttendanceSchemaClass = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: { virtuals: true, getters: true },
    })
], AttendanceSchemaClass);
exports.AttendanceSchema = mongoose_1.SchemaFactory.createForClass(AttendanceSchemaClass);
exports.AttendanceSchema.index({ classScheduleId: 1, student: 1 });
exports.AttendanceSchema.index({ classScheduleId: 1 });
exports.AttendanceSchema.index({ courseId: 1 });
exports.AttendanceSchema.index({ student: 1 });
exports.AttendanceSchema.index({ markedBy: 1 });
exports.AttendanceSchema.index({ status: 1 });
exports.AttendanceSchema.index({ markedAt: -1 });
//# sourceMappingURL=attendance.schema.js.mapssss