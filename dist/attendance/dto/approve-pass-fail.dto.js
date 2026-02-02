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
exports.GetPassFailRecordsDto = exports.ApprovePassFailDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ApprovePassFailDto {
}
exports.ApprovePassFailDto = ApprovePassFailDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Pass/Fail Record ID',
        example: '675f4aaf2b67a23d4c9f2941',
    }),
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ApprovePassFailDto.prototype, "recordId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Approve the pass/fail status',
        example: true,
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Boolean)
], ApprovePassFailDto.prototype, "approve", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Optional notes',
        example: 'Approved after review',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ApprovePassFailDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Certificate URL - if provided and record is PASS, certificate will be issued automatically',
        example: 'https://example.com/certificates/cert123.pdf',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ApprovePassFailDto.prototype, "certificateUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'PDF filename for certificate - if provided, certificateUrl will be generated automatically',
        example: 'Certificate No. 1.pdf',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ApprovePassFailDto.prototype, "pdfFileName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Operator ID (will be taken from auth context in production)',
        example: '675f4aaf2b67a23d4c9f2941',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], ApprovePassFailDto.prototype, "operatorId", void 0);
class GetPassFailRecordsDto {
}
exports.GetPassFailRecordsDto = GetPassFailRecordsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Course ID',
        example: '675f4aaf2b67a23d4c9f2941',
    }),
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GetPassFailRecordsDto.prototype, "courseId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Session ID from course.sessions array',
        example: '671018fabc123456789ef015',
    }),
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GetPassFailRecordsDto.prototype, "sessionId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by status (PASS/FAIL)',
        example: 'PASS',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetPassFailRecordsDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by approval status',
        example: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], GetPassFailRecordsDto.prototype, "isApproved", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by certificate issued status',
        example: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], GetPassFailRecordsDto.prototype, "certificateIssued", void 0);
//# sourceMappingURL=approve-pass-fail.dto.js.map