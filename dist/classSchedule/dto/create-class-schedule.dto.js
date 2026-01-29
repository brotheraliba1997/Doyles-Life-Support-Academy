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
exports.CreateClassScheduleDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateClassScheduleDto {
}
exports.CreateClassScheduleDto = CreateClassScheduleDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '671018fabc123456789ef013',
        description: 'Course associated with the class',
    }),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateClassScheduleDto.prototype, "course", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '671018fabc123456789ef015',
        description: 'Session ID from course.sessions array (required for session-based schedule creation)',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateClassScheduleDto.prototype, "sessionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        oneOf: [
            { type: 'string', example: '671018fabc123456789ef015' },
            {
                type: 'array',
                items: { type: 'string' },
                example: ['671018fabc123456789ef015', '671018fabc123456789ef016'],
            },
        ],
        description: 'Student ID(s) attending this class. Can be a single ID or array of IDs',
    }),
    (0, class_validator_1.IsMongoId)({ each: true }),
    __metadata("design:type", Object)
], CreateClassScheduleDto.prototype, "students", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '2025-11-05',
        description: 'Date of the class (ISO format: YYYY-MM-DD). Not needed for session-based creation (comes from timeBlocks)',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateClassScheduleDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '15:30',
        description: 'Time of the class (HH:mm in 24-hour format). Not needed for session-based creation (comes from timeBlocks)',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateClassScheduleDto.prototype, "time", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 60,
        description: 'Duration of the class in minutes',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateClassScheduleDto.prototype, "duration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'https://meet.google.com/xyz-1234-abc',
        description: 'Google Meet link for the scheduled class',
    }),
    (0, class_validator_1.IsUrl)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateClassScheduleDto.prototype, "googleMeetLink", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'a6d2b99a-f81a-4cb5-a123-984e07fd9e33',
        description: 'Unique key for meeting security validation',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateClassScheduleDto.prototype, "securityKey", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: ['scheduled', 'ongoing', 'completed', 'cancelled'],
        default: 'scheduled',
        description: 'Current status of the class',
    }),
    (0, class_validator_1.IsEnum)(['scheduled', 'ongoing', 'completed', 'cancelled']),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateClassScheduleDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 0,
        minimum: 0,
        maximum: 100,
        default: 0,
        description: 'Average progress percentage of the class',
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateClassScheduleDto.prototype, "progress", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '2025-11-05T15:30:00.000Z',
        description: 'Class start timestamp (optional)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], CreateClassScheduleDto.prototype, "startedAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '2025-11-05T16:30:00.000Z',
        description: 'Class end timestamp (optional)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], CreateClassScheduleDto.prototype, "endedAt", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateClassScheduleDto.prototype, "googleCalendarEventLink", void 0);
//# sourceMappingURL=create-class-schedule.dto.js.map