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
exports.CreateCertificateDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CreateCertificateDto {
}
exports.CreateCertificateDto = CreateCertificateDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The MongoDB ID of the user',
        example: '507f1f77bcf86cd799439011',
    }),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateCertificateDto.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The MongoDB ID of the course',
        example: '507f1f77bcf86cd799439012',
    }),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateCertificateDto.prototype, "course", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'URL to the certificate file',
        example: 'https://example.com/certificates/cert123.pdf',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCertificateDto.prototype, "certificateUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'The date when the certificate was issued',
        type: Date,
        example: new Date().toISOString(),
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], CreateCertificateDto.prototype, "issuedDate", void 0);
//# sourceMappingURL=create-certificate.dto.js.map