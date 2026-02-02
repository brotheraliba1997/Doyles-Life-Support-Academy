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
exports.ClassScheduleEntity = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const idType = String;
class ClassScheduleEntity {
    constructor(partial) {
        Object.assign(this, partial);
    }
}
exports.ClassScheduleEntity = ClassScheduleEntity;
__decorate([
    (0, swagger_1.ApiProperty)({ type: idType }),
    (0, class_validator_1.Allow)(),
    __metadata("design:type", Object)
], ClassScheduleEntity.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: idType,
        example: '671018fabc123456789ef013',
        description: 'Course associated with this class',
    }),
    (0, class_validator_1.Allow)(),
    __metadata("design:type", Object)
], ClassScheduleEntity.prototype, "course", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: idType,
        example: '671018fabc123456789ef014',
        description: 'Instructor conducting the class',
    }),
    (0, class_validator_1.Allow)(),
    __metadata("design:type", Object)
], ClassScheduleEntity.prototype, "instructor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [idType],
        example: ['671018fabc123456789ef015', '671018fabc123456789ef016'],
        description: 'List of students enrolled/assigned to this class',
    }),
    (0, class_validator_1.Allow)(),
    __metadata("design:type", Array)
], ClassScheduleEntity.prototype, "students", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2025-11-05',
        description: 'Date of the class (ISO format YYYY-MM-DD)',
    }),
    (0, class_validator_1.Allow)(),
    __metadata("design:type", String)
], ClassScheduleEntity.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '15:30',
        description: 'Time of the class (HH:mm 24-hour format)',
    }),
    (0, class_validator_1.Allow)(),
    __metadata("design:type", String)
], ClassScheduleEntity.prototype, "time", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'https://meet.google.com/xyz-1234-abc',
        description: 'Google Meet link for this class session',
    }),
    (0, class_validator_1.Allow)(),
    __metadata("design:type", String)
], ClassScheduleEntity.prototype, "googleMeetLink", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'a6d2b99a-f81a-4cb5-a123-984e07fd9e33',
        description: 'Unique security key for joining class securely',
    }),
    (0, class_validator_1.Allow)(),
    __metadata("design:type", String)
], ClassScheduleEntity.prototype, "securityKey", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: ['scheduled', 'ongoing', 'completed', 'cancelled'],
        example: 'scheduled',
        default: 'scheduled',
        description: 'Current status of the class',
    }),
    (0, class_validator_1.Allow)(),
    __metadata("design:type", String)
], ClassScheduleEntity.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 0,
        minimum: 0,
        maximum: 100,
        default: 0,
        description: 'Average completion or attendance progress of this class',
    }),
    (0, class_validator_1.Allow)(),
    __metadata("design:type", Number)
], ClassScheduleEntity.prototype, "progress", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '2025-11-05T15:30:00.000Z',
        description: 'Timestamp when the class actually started',
    }),
    (0, class_validator_1.Allow)(),
    __metadata("design:type", Date)
], ClassScheduleEntity.prototype, "startedAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '2025-11-05T16:30:00.000Z',
        description: 'Timestamp when the class ended',
    }),
    (0, class_validator_1.Allow)(),
    __metadata("design:type", Date)
], ClassScheduleEntity.prototype, "endedAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: false,
        description: 'Overall completion status - true when all timeBlocks complete',
    }),
    (0, class_validator_1.Allow)(),
    __metadata("design:type", Boolean)
], ClassScheduleEntity.prototype, "isCompleted", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: [Boolean],
        example: [true, true, false, false, false],
        description: 'Tracks which timeBlocks are completed (true = done, false = pending)',
    }),
    (0, class_validator_1.Allow)(),
    __metadata("design:type", Array)
], ClassScheduleEntity.prototype, "ClassLeftList", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '2025-11-05T15:32:00.000Z',
        description: 'When students joined (if tracking join time)',
    }),
    (0, class_validator_1.Allow)(),
    __metadata("design:type", Date)
], ClassScheduleEntity.prototype, "attendedAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'https://certificates.myapp.com/abcd1234.pdf',
        description: 'Optional certificate or report link for the class',
    }),
    (0, class_validator_1.Allow)(),
    __metadata("design:type", String)
], ClassScheduleEntity.prototype, "certificateLink", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-10-31T10:00:00.000Z' }),
    (0, class_validator_1.Allow)(),
    __metadata("design:type", Date)
], ClassScheduleEntity.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-10-31T10:00:00.000Z' }),
    (0, class_validator_1.Allow)(),
    __metadata("design:type", Date)
], ClassScheduleEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2025-10-31T10:00:00.000Z' }),
    (0, class_validator_1.Allow)(),
    __metadata("design:type", Date)
], ClassScheduleEntity.prototype, "deletedAt", void 0);
//# sourceMappingURL=class-scheduleEntity.js.map