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
exports.SortAttendanceDto = exports.FilterAttendanceDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const attendance_schema_1 = require("../schema/attendance.schema");
class FilterAttendanceDto {
}
exports.FilterAttendanceDto = FilterAttendanceDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by class schedule ID',
        example: '675f4aaf2b67a23d4c9f2941',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], FilterAttendanceDto.prototype, "classScheduleId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by course ID',
        example: '675f4aaf2b67a23d4c9f2941',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], FilterAttendanceDto.prototype, "courseId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by session ID from course.sessions array (ObjectId)',
        example: '671018fabc123456789ef015',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], FilterAttendanceDto.prototype, "sessionId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by student ID',
        example: '675f4aaf2b67a23d4c9f2941',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], FilterAttendanceDto.prototype, "studentId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by instructor who marked attendance',
        example: '675f4aaf2b67a23d4c9f2941',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], FilterAttendanceDto.prototype, "markedBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: attendance_schema_1.AttendanceStatusEnum,
        description: 'Filter by attendance status',
        example: attendance_schema_1.AttendanceStatusEnum.PRESENT,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(attendance_schema_1.AttendanceStatusEnum),
    __metadata("design:type", String)
], FilterAttendanceDto.prototype, "status", void 0);
class SortAttendanceDto {
    constructor() {
        this.sortBy = 'desc';
    }
}
exports.SortAttendanceDto = SortAttendanceDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: ['asc', 'desc'],
        default: 'desc',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SortAttendanceDto.prototype, "sortBy", void 0);
//# sourceMappingURL=query-attendance.dto.js.map