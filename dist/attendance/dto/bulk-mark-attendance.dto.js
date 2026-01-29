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
exports.BulkMarkAttendanceDto = exports.StudentAttendanceDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const attendance_schema_1 = require("../schema/attendance.schema");
class StudentAttendanceDto {
}
exports.StudentAttendanceDto = StudentAttendanceDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Student ID',
        example: '675f4aaf2b67a23d4c9f2941',
    }),
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], StudentAttendanceDto.prototype, "studentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: attendance_schema_1.AttendanceStatusEnum,
        description: 'Attendance status for this student',
        example: attendance_schema_1.AttendanceStatusEnum.PRESENT,
    }),
    (0, class_validator_1.IsEnum)(attendance_schema_1.AttendanceStatusEnum),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], StudentAttendanceDto.prototype, "status", void 0);
class BulkMarkAttendanceDto {
}
exports.BulkMarkAttendanceDto = BulkMarkAttendanceDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Class Schedule ID',
        example: '675f4aaf2b67a23d4c9f2941',
    }),
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BulkMarkAttendanceDto.prototype, "classScheduleId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Course ID - sessions array is inside course',
        example: '675f4aaf2b67a23d4c9f2941',
    }),
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BulkMarkAttendanceDto.prototype, "courseId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Session ID from course.sessions array (ObjectId)',
        example: '671018fabc123456789ef015',
    }),
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BulkMarkAttendanceDto.prototype, "sessionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Start date',
        example: '2025-12-09',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BulkMarkAttendanceDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Start time',
        example: '14:00',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BulkMarkAttendanceDto.prototype, "startTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Instructor ID who is marking the attendance',
        example: '675f4aaf2b67a23d4c9f2941',
    }),
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BulkMarkAttendanceDto.prototype, "markedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [StudentAttendanceDto],
        description: 'Array of students with their attendance status',
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => StudentAttendanceDto),
    __metadata("design:type", Array)
], BulkMarkAttendanceDto.prototype, "students", void 0);
//# sourceMappingURL=bulk-mark-attendance.dto.js.map