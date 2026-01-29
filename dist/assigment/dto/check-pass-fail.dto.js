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
exports.PassFailSummary = exports.StudentPassFailResult = exports.CheckPassFailStudentDto = exports.CheckPassFailDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CheckPassFailDto {
}
exports.CheckPassFailDto = CheckPassFailDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Class Schedule ID (optional - for reference only)',
        example: '675f4aaf2b67a23d4c9f2941',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CheckPassFailDto.prototype, "classScheduleId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Course ID',
        example: '675f4aaf2b67a23d4c9f2941',
    }),
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CheckPassFailDto.prototype, "courseId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Session ID from course.sessions array',
        example: '671018fabc123456789ef015',
    }),
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CheckPassFailDto.prototype, "sessionId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Automatically issue certificate for passed students',
        example: false,
        default: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CheckPassFailDto.prototype, "issueCertificates", void 0);
class CheckPassFailStudentDto {
}
exports.CheckPassFailStudentDto = CheckPassFailStudentDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Class Schedule ID (optional - for reference only)',
        example: '675f4aaf2b67a23d4c9f2941',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CheckPassFailStudentDto.prototype, "studentId", void 0);
class StudentPassFailResult {
}
exports.StudentPassFailResult = StudentPassFailResult;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StudentPassFailResult.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StudentPassFailResult.prototype, "studentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StudentPassFailResult.prototype, "studentName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], StudentPassFailResult.prototype, "totalClasses", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], StudentPassFailResult.prototype, "presentCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], StudentPassFailResult.prototype, "percentage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], StudentPassFailResult.prototype, "absentCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: ['PASS', 'FAIL'],
    }),
    __metadata("design:type", String)
], StudentPassFailResult.prototype, "result", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Boolean)
], StudentPassFailResult.prototype, "certificateIssued", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], StudentPassFailResult.prototype, "certificateId", void 0);
class PassFailSummary {
}
exports.PassFailSummary = PassFailSummary;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PassFailSummary.prototype, "classScheduleId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PassFailSummary.prototype, "courseId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PassFailSummary.prototype, "sessionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PassFailSummary.prototype, "totalStudents", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PassFailSummary.prototype, "passedStudents", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PassFailSummary.prototype, "failedStudents", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [StudentPassFailResult] }),
    __metadata("design:type", Array)
], PassFailSummary.prototype, "results", void 0);
//# sourceMappingURL=check-pass-fail.dto.js.map