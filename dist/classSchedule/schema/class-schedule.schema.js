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
exports.ClassScheduleSchema = exports.ClassScheduleSchemaClass = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const document_entity_helper_1 = require("../../utils/document-entity-helper");
const course_schema_1 = require("../../course/schema/course.schema");
const user_schema_1 = require("../../users/schema/user.schema");
let ClassScheduleSchemaClass = class ClassScheduleSchemaClass extends document_entity_helper_1.EntityDocumentHelper {
};
exports.ClassScheduleSchemaClass = ClassScheduleSchemaClass;
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Types.ObjectId,
        ref: course_schema_1.CourseSchemaClass.name,
        required: true,
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], ClassScheduleSchemaClass.prototype, "course", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
        description: 'Session ID from course.sessions array',
        index: true,
    }),
    __metadata("design:type", String)
], ClassScheduleSchemaClass.prototype, "sessionId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [{ type: mongoose_2.Types.ObjectId, ref: user_schema_1.UserSchemaClass.name }],
        default: [],
    }),
    __metadata("design:type", Array)
], ClassScheduleSchemaClass.prototype, "students", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
        description: 'Date of the class (YYYY-MM-DD)',
    }),
    __metadata("design:type", String)
], ClassScheduleSchemaClass.prototype, "date", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
        description: 'Time of the class (HH:mm in 24-hour format)',
    }),
    __metadata("design:type", String)
], ClassScheduleSchemaClass.prototype, "time", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
        min: 1,
        description: 'Duration of the class in minutes',
    }),
    __metadata("design:type", Number)
], ClassScheduleSchemaClass.prototype, "duration", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: false,
        description: 'Google Meet link for the scheduled class',
    }),
    __metadata("design:type", String)
], ClassScheduleSchemaClass.prototype, "googleMeetLink", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: false,
        unique: true,
        sparse: true,
        description: 'Security key used for class access validation',
    }),
    __metadata("design:type", String)
], ClassScheduleSchemaClass.prototype, "securityKey", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: ['scheduled', 'ongoing', 'completed', 'cancelled'],
        default: 'scheduled',
    }),
    __metadata("design:type", String)
], ClassScheduleSchemaClass.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
        default: 0,
        min: 0,
        max: 100,
        description: 'Average progress or attendance percentage of this class',
    }),
    __metadata("design:type", Number)
], ClassScheduleSchemaClass.prototype, "progress", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Date,
        description: 'Timestamp when the class started',
    }),
    __metadata("design:type", Date)
], ClassScheduleSchemaClass.prototype, "startedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Date,
        description: 'Timestamp when the class ended',
    }),
    __metadata("design:type", Date)
], ClassScheduleSchemaClass.prototype, "endedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], ClassScheduleSchemaClass.prototype, "isCompleted", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [Boolean], default: [] }),
    __metadata("design:type", Array)
], ClassScheduleSchemaClass.prototype, "ClassLeftList", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        description: 'Google Calendar event link',
    }),
    __metadata("design:type", String)
], ClassScheduleSchemaClass.prototype, "googleCalendarEventLink", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: mongoose_2.now }),
    __metadata("design:type", Date)
], ClassScheduleSchemaClass.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: mongoose_2.now }),
    __metadata("design:type", Date)
], ClassScheduleSchemaClass.prototype, "updatedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], ClassScheduleSchemaClass.prototype, "deletedAt", void 0);
exports.ClassScheduleSchemaClass = ClassScheduleSchemaClass = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: {
            virtuals: true,
            getters: true,
        },
    })
], ClassScheduleSchemaClass);
exports.ClassScheduleSchema = mongoose_1.SchemaFactory.createForClass(ClassScheduleSchemaClass);
exports.ClassScheduleSchema.index({ course: 1 });
exports.ClassScheduleSchema.index({ instructor: 1 });
exports.ClassScheduleSchema.index({ date: 1, time: 1 });
exports.ClassScheduleSchema.index({ status: 1 });
exports.ClassScheduleSchema.index({ createdAt: -1 });
//# sourceMappingURL=class-schedule.schema.js.map