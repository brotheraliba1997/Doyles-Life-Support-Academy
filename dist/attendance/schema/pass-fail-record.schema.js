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
exports.PassFailRecordSchema = exports.PassFailRecordSchemaClass = exports.PassFailStatusEnum = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const document_entity_helper_1 = require("../../utils/document-entity-helper");
const course_schema_1 = require("../../course/schema/course.schema");
const user_schema_1 = require("../../users/schema/user.schema");
const class_schedule_schema_1 = require("../../classSchedule/schema/class-schedule.schema");
var PassFailStatusEnum;
(function (PassFailStatusEnum) {
    PassFailStatusEnum["PASS"] = "PASS";
    PassFailStatusEnum["FAIL"] = "FAIL";
})(PassFailStatusEnum || (exports.PassFailStatusEnum = PassFailStatusEnum = {}));
let PassFailRecordSchemaClass = class PassFailRecordSchemaClass extends document_entity_helper_1.EntityDocumentHelper {
};
exports.PassFailRecordSchemaClass = PassFailRecordSchemaClass;
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Types.ObjectId,
        ref: user_schema_1.UserSchemaClass.name,
        required: true,
        index: true,
        description: 'Student ID',
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], PassFailRecordSchemaClass.prototype, "studentId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Types.ObjectId,
        ref: course_schema_1.CourseSchemaClass.name,
        required: true,
        index: true,
        description: 'Course ID',
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], PassFailRecordSchemaClass.prototype, "courseId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Types.ObjectId,
        required: true,
        index: true,
        description: 'Session ID from course.sessions array',
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], PassFailRecordSchemaClass.prototype, "sessionId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Types.ObjectId,
        ref: class_schedule_schema_1.ClassScheduleSchemaClass.name,
        required: false,
        index: true,
        description: 'Class Schedule ID (optional - for specific class pass/fail)',
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], PassFailRecordSchemaClass.prototype, "classScheduleId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: Object.values(PassFailStatusEnum),
        required: true,
        description: 'Pass or Fail status',
    }),
    __metadata("design:type", String)
], PassFailRecordSchemaClass.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
        required: true,
        description: 'Total number of classes',
    }),
    __metadata("design:type", Number)
], PassFailRecordSchemaClass.prototype, "totalClasses", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
        required: true,
        default: 0,
        description: 'Number of present attendance records',
    }),
    __metadata("design:type", Number)
], PassFailRecordSchemaClass.prototype, "presentCount", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
        required: true,
        default: 0,
        description: 'Number of absent attendance records',
    }),
    __metadata("design:type", Number)
], PassFailRecordSchemaClass.prototype, "absentCount", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
        required: true,
        default: 0,
        description: 'Attendance percentage',
    }),
    __metadata("design:type", Number)
], PassFailRecordSchemaClass.prototype, "attendancePercentage", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Boolean,
        default: false,
        index: true,
        description: 'Whether operator has approved this pass/fail status',
    }),
    __metadata("design:type", Boolean)
], PassFailRecordSchemaClass.prototype, "isApproved", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Types.ObjectId,
        ref: user_schema_1.UserSchemaClass.name,
        required: false,
        description: 'Operator who approved the status',
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], PassFailRecordSchemaClass.prototype, "approvedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Date,
        required: false,
        description: 'Timestamp when status was approved',
    }),
    __metadata("design:type", Date)
], PassFailRecordSchemaClass.prototype, "approvedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Boolean,
        default: false,
        index: true,
        description: 'Whether certificate has been issued',
    }),
    __metadata("design:type", Boolean)
], PassFailRecordSchemaClass.prototype, "certificateIssued", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Types.ObjectId,
        required: false,
        description: 'Certificate ID if certificate has been issued',
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], PassFailRecordSchemaClass.prototype, "certificateId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: false,
        description: 'Certificate URL (PDF or link)',
    }),
    __metadata("design:type", String)
], PassFailRecordSchemaClass.prototype, "certificateUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        trim: true,
        required: false,
        description: 'Optional notes or remarks',
    }),
    __metadata("design:type", String)
], PassFailRecordSchemaClass.prototype, "notes", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Date,
        default: () => new Date(),
        description: 'Timestamp when pass/fail was determined',
    }),
    __metadata("design:type", Date)
], PassFailRecordSchemaClass.prototype, "determinedAt", void 0);
exports.PassFailRecordSchemaClass = PassFailRecordSchemaClass = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: { virtuals: true, getters: true },
    })
], PassFailRecordSchemaClass);
exports.PassFailRecordSchema = mongoose_1.SchemaFactory.createForClass(PassFailRecordSchemaClass);
exports.PassFailRecordSchema.index({ studentId: 1, courseId: 1, sessionId: 1 }, { unique: true });
exports.PassFailRecordSchema.index({ courseId: 1, sessionId: 1 });
exports.PassFailRecordSchema.index({ studentId: 1 });
exports.PassFailRecordSchema.index({ status: 1 });
exports.PassFailRecordSchema.index({ isApproved: 1 });
exports.PassFailRecordSchema.index({ certificateIssued: 1 });
exports.PassFailRecordSchema.index({ determinedAt: -1 });
//# sourceMappingURL=pass-fail-record.schema.js.map