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
exports.SortClassScheduleDto = exports.FilterClassScheduleDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class FilterClassScheduleDto {
}
exports.FilterClassScheduleDto = FilterClassScheduleDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by instructor ID',
        example: '671018fabc123456789ef014',
    }),
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilterClassScheduleDto.prototype, "instructorId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by course ID',
        example: '671018fabc123456789ef013',
    }),
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilterClassScheduleDto.prototype, "courseId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by student ID (if student enrolled in class)',
        example: '671018fabc123456789ef015',
    }),
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], FilterClassScheduleDto.prototype, "studentId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: ['scheduled', 'ongoing', 'completed', 'cancelled'],
        description: 'Filter by class status',
        example: 'scheduled',
    }),
    (0, class_validator_1.IsEnum)(['scheduled', 'ongoing', 'completed', 'cancelled']),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilterClassScheduleDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter classes after a specific start date',
        example: '2025-11-01',
    }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilterClassScheduleDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter classes before a specific end date',
        example: '2025-11-30',
    }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilterClassScheduleDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Search by Google Meet link or security key',
        example: 'a6d2b99a-f81a-4cb5-a123-984e07fd9e33',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilterClassScheduleDto.prototype, "search", void 0);
class SortClassScheduleDto {
}
exports.SortClassScheduleDto = SortClassScheduleDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Sort by field name (e.g. date, time, createdAt)',
        example: 'date',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SortClassScheduleDto.prototype, "orderBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: ['ASC', 'DESC'],
        description: 'Sort order',
        example: 'DESC',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SortClassScheduleDto.prototype, "order", void 0);
//# sourceMappingURL=query-class-schedule.dto.js.map