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
exports.AssignmentCheckPassFailDto = exports.PassFailStatusEnum = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
var PassFailStatusEnum;
(function (PassFailStatusEnum) {
    PassFailStatusEnum["PASS"] = "PASS";
    PassFailStatusEnum["FAIL"] = "FAIL";
})(PassFailStatusEnum || (exports.PassFailStatusEnum = PassFailStatusEnum = {}));
class AssignmentCheckPassFailDto {
}
exports.AssignmentCheckPassFailDto = AssignmentCheckPassFailDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Class Schedule ID (optional - for reference only)',
        example: '675f4aaf2b67a23d4c9f2941',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], AssignmentCheckPassFailDto.prototype, "classScheduleId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Course ID',
        example: '675f4aaf2b67a23d4c9f2941',
    }),
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AssignmentCheckPassFailDto.prototype, "courseId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Session ID from course.sessions array',
        example: '671018fabc123456789ef015',
    }),
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AssignmentCheckPassFailDto.prototype, "sessionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Instructor ID who evaluated the assignment',
        example: '671018fabc123456789ef015',
    }),
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AssignmentCheckPassFailDto.prototype, "markedBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Automatically issue certificate for passed students',
        example: false,
        default: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], AssignmentCheckPassFailDto.prototype, "issueCertificate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Assignment marks',
        example: 10,
        minimum: 0,
        maximum: 10,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(10),
    __metadata("design:type", Number)
], AssignmentCheckPassFailDto.prototype, "marks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Pass or Fail status',
        enum: PassFailStatusEnum,
        example: PassFailStatusEnum.PASS,
    }),
    (0, class_validator_1.IsEnum)(PassFailStatusEnum),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AssignmentCheckPassFailDto.prototype, "status", void 0);
//# sourceMappingURL=assigment-check-pass-fail.dto.js.map