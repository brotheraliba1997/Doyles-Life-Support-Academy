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
exports.CreateAssignmentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreateAssignmentDto {
}
exports.CreateAssignmentDto = CreateAssignmentDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Class Schedule ID',
        example: '675f4aaf2b67a23d4c9f2941',
    }),
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAssignmentDto.prototype, "classScheduleId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Course ID - sessions array is inside course',
        example: '675f4aaf2b67a23d4c9f2941',
    }),
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAssignmentDto.prototype, "courseId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Session ID from course.sessions array (ObjectId)',
        example: '671018fabc123456789ef015',
    }),
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAssignmentDto.prototype, "sessionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Student ID whose attendance is being marked',
        example: '675f4aaf2b67a23d4c9f2941',
    }),
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAssignmentDto.prototype, "studentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Instructor ID who is marking the attendance',
        example: '675f4aaf2b67a23d4c9f2941',
    }),
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAssignmentDto.prototype, "markedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Marks awarded for the assignment',
        example: 10,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(10),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateAssignmentDto.prototype, "marks", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Optional notes about the attendance',
        example: 'Student arrived 10 minutes late',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAssignmentDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'PDF filename for certificate',
        example: 'Certificate No. 1.pdf',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAssignmentDto.prototype, "pdfFileName", void 0);
//# sourceMappingURL=create-assignment.dto.js.map