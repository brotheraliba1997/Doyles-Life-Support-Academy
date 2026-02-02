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
exports.BulkIssueCertificatesDto = exports.IssueCertificateDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class IssueCertificateDto {
}
exports.IssueCertificateDto = IssueCertificateDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Pass/Fail Record ID',
        example: '675f4aaf2b67a23d4c9f2941',
    }),
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], IssueCertificateDto.prototype, "recordId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Certificate URL (PDF or link)',
        example: 'https://example.com/certificates/cert123.pdf',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], IssueCertificateDto.prototype, "certificateUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Certificate ID (if already created)',
        example: '675f4aaf2b67a23d4c9f2941',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], IssueCertificateDto.prototype, "certificateId", void 0);
class BulkIssueCertificatesDto {
}
exports.BulkIssueCertificatesDto = BulkIssueCertificatesDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Course ID',
        example: '675f4aaf2b67a23d4c9f2941',
    }),
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BulkIssueCertificatesDto.prototype, "courseId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Session ID from course.sessions array',
        example: '671018fabc123456789ef015',
    }),
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BulkIssueCertificatesDto.prototype, "sessionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Array of certificate data with recordId and certificateUrl',
        type: 'array',
        items: {
            type: 'object',
            properties: {
                recordId: { type: 'string' },
                certificateUrl: { type: 'string' },
                certificateId: { type: 'string' },
            },
        },
    }),
    __metadata("design:type", Array)
], BulkIssueCertificatesDto.prototype, "certificates", void 0);
//# sourceMappingURL=issue-certificate.dto.js.map