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
exports.AssignmentPassFailRecordEntity = void 0;
const swagger_1 = require("@nestjs/swagger");
const idType = String;
class AssignmentPassFailRecordEntity {
}
exports.AssignmentPassFailRecordEntity = AssignmentPassFailRecordEntity;
__decorate([
    (0, swagger_1.ApiProperty)({ type: idType }),
    __metadata("design:type", Object)
], AssignmentPassFailRecordEntity.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Student ID',
        example: '675f4aaf2b67a23d4c9f2941',
    }),
    __metadata("design:type", Object)
], AssignmentPassFailRecordEntity.prototype, "studentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Course ID',
        example: '675f4aaf2b67a23d4c9f2941',
    }),
    __metadata("design:type", Object)
], AssignmentPassFailRecordEntity.prototype, "courseId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Session ID from course.sessions array',
        example: '671018fabc123456789ef015',
    }),
    __metadata("design:type", Object)
], AssignmentPassFailRecordEntity.prototype, "sessionId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Class Schedule ID (optional)',
        example: '675f4aaf2b67a23d4c9f2941',
    }),
    __metadata("design:type", Object)
], AssignmentPassFailRecordEntity.prototype, "classScheduleId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total number of classes',
        example: 20,
    }),
    __metadata("design:type", Number)
], AssignmentPassFailRecordEntity.prototype, "totalClasses", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Number of present attendance records',
        example: 18,
    }),
    __metadata("design:type", Number)
], AssignmentPassFailRecordEntity.prototype, "presentCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Number of absent attendance records',
        example: 2,
    }),
    __metadata("design:type", Number)
], AssignmentPassFailRecordEntity.prototype, "absentCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Attendance percentage',
        example: 90,
    }),
    __metadata("design:type", Number)
], AssignmentPassFailRecordEntity.prototype, "attendancePercentage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether operator has approved this pass/fail status',
        example: false,
    }),
    __metadata("design:type", Boolean)
], AssignmentPassFailRecordEntity.prototype, "isApproved", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Operator who approved the status',
        example: '675f4aaf2b67a23d4c9f2941',
    }),
    __metadata("design:type", Object)
], AssignmentPassFailRecordEntity.prototype, "approvedBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Timestamp when status was approved',
        example: '2025-02-18T10:30:00.000Z',
    }),
    __metadata("design:type", Date)
], AssignmentPassFailRecordEntity.prototype, "approvedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether certificate has been issued',
        example: false,
    }),
    __metadata("design:type", Boolean)
], AssignmentPassFailRecordEntity.prototype, "certificateIssued", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Certificate ID if certificate has been issued',
        example: '675f4aaf2b67a23d4c9f2941',
    }),
    __metadata("design:type", Object)
], AssignmentPassFailRecordEntity.prototype, "certificateId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Certificate URL (PDF or link)',
        example: 'https://example.com/certificates/cert123.pdf',
    }),
    __metadata("design:type", String)
], AssignmentPassFailRecordEntity.prototype, "certificateUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Optional notes or remarks',
        example: 'Student completed all classes successfully',
    }),
    __metadata("design:type", String)
], AssignmentPassFailRecordEntity.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Timestamp when pass/fail was determined',
        example: '2025-02-18T10:30:00.000Z',
    }),
    __metadata("design:type", Date)
], AssignmentPassFailRecordEntity.prototype, "determinedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Record creation timestamp',
        example: '2025-02-18T10:30:00.000Z',
    }),
    __metadata("design:type", Date)
], AssignmentPassFailRecordEntity.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Record last update timestamp',
        example: '2025-02-18T10:30:00.000Z',
    }),
    __metadata("design:type", Date)
], AssignmentPassFailRecordEntity.prototype, "updatedAt", void 0);
//# sourceMappingURL=pass-fail-record.entity.js.map