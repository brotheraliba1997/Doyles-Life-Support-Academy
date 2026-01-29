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
exports.AttendanceEntity = void 0;
const swagger_1 = require("@nestjs/swagger");
const attendance_schema_1 = require("../schema/attendance.schema");
const idType = String;
class AttendanceEntity {
}
exports.AttendanceEntity = AttendanceEntity;
__decorate([
    (0, swagger_1.ApiProperty)({ type: idType }),
    __metadata("design:type", Object)
], AttendanceEntity.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Class Schedule ID',
        example: '675f4aaf2b67a23d4c9f2941',
    }),
    __metadata("design:type", Object)
], AttendanceEntity.prototype, "classScheduleId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Course ID - sessions array is inside course',
        example: '675f4aaf2b67a23d4c9f2941',
    }),
    __metadata("design:type", Object)
], AttendanceEntity.prototype, "courseId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Session ID from course.sessions array (ObjectId)',
        example: '671018fabc123456789ef015',
    }),
    __metadata("design:type", Object)
], AttendanceEntity.prototype, "sessionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Student whose attendance is marked',
        example: '675f4aaf2b67a23d4c9f2941',
    }),
    __metadata("design:type", Object)
], AttendanceEntity.prototype, "student", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Instructor who marked the attendance',
        example: '675f4aaf2b67a23d4c9f2941',
    }),
    __metadata("design:type", Object)
], AttendanceEntity.prototype, "markedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: attendance_schema_1.AttendanceStatusEnum,
        description: 'Attendance status',
        example: attendance_schema_1.AttendanceStatusEnum.PRESENT,
    }),
    __metadata("design:type", String)
], AttendanceEntity.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Optional notes about the attendance',
        example: 'Student arrived 10 minutes late',
    }),
    __metadata("design:type", String)
], AttendanceEntity.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Timestamp when attendance was marked',
        example: '2025-02-18T10:30:00.000Z',
    }),
    __metadata("design:type", Date)
], AttendanceEntity.prototype, "markedAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Certificate PDF URL',
        example: 'http://localhost:5000/pdfs/Certificate No. 1.pdf',
    }),
    __metadata("design:type", String)
], AttendanceEntity.prototype, "certificateUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Index of the timeBlock in session.timeBlocks array (0-based)',
        example: 0,
    }),
    __metadata("design:type", Number)
], AttendanceEntity.prototype, "timeBlockIndex", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Record creation timestamp',
        example: '2025-02-18T10:30:00.000Z',
    }),
    __metadata("design:type", Date)
], AttendanceEntity.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Record last update timestamp',
        example: '2025-02-18T10:30:00.000Z',
    }),
    __metadata("design:type", Date)
], AttendanceEntity.prototype, "updatedAt", void 0);
//# sourceMappingURL=attendance.entity.js.map