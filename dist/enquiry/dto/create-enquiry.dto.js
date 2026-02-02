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
exports.CreateEnquiryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const enquiry_schema_1 = require("../schema/enquiry.schema");
class CreateEnquiryDto {
}
exports.CreateEnquiryDto = CreateEnquiryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Subject of the enquiry' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEnquiryDto.prototype, "subject", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Full name of the requester' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEnquiryDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Email of the requester' }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateEnquiryDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Phone number of the requester' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEnquiryDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Company name' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEnquiryDto.prototype, "company", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Designation/role at the company' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEnquiryDto.prototype, "designation", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Type of enquiry',
        enum: enquiry_schema_1.EnquiryTypeEnum,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enquiry_schema_1.EnquiryTypeEnum),
    __metadata("design:type", String)
], CreateEnquiryDto.prototype, "enquiryType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Certification scheme',
        enum: enquiry_schema_1.SchemeEnum,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enquiry_schema_1.SchemeEnum),
    __metadata("design:type", String)
], CreateEnquiryDto.prototype, "scheme", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Training category',
        enum: enquiry_schema_1.TrainingCategoryEnum,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enquiry_schema_1.TrainingCategoryEnum),
    __metadata("design:type", String)
], CreateEnquiryDto.prototype, "trainingCategory", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Training type',
        enum: enquiry_schema_1.TrainingTypeEnum,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enquiry_schema_1.TrainingTypeEnum),
    __metadata("design:type", String)
], CreateEnquiryDto.prototype, "trainingType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Training delivery method',
        enum: enquiry_schema_1.TrainingDeliveryEnum,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enquiry_schema_1.TrainingDeliveryEnum),
    __metadata("design:type", String)
], CreateEnquiryDto.prototype, "trainingDelivery", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Number of learners',
        example: 1,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateEnquiryDto.prototype, "numberOfLearners", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Preferred learning event date',
        example: '2025-01-15',
        type: String,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEnquiryDto.prototype, "preferredLearningDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Organization type',
        enum: enquiry_schema_1.OrganizationTypeEnum,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enquiry_schema_1.OrganizationTypeEnum),
    __metadata("design:type", String)
], CreateEnquiryDto.prototype, "organizationType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Language preference',
        enum: enquiry_schema_1.LanguageEnum,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enquiry_schema_1.LanguageEnum),
    __metadata("design:type", String)
], CreateEnquiryDto.prototype, "language", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Certifications held',
        enum: enquiry_schema_1.CertificationEnum,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enquiry_schema_1.CertificationEnum),
    __metadata("design:type", String)
], CreateEnquiryDto.prototype, "certificationsHeld", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Delivery preference',
        enum: enquiry_schema_1.DeliveryEnum,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enquiry_schema_1.DeliveryEnum),
    __metadata("design:type", String)
], CreateEnquiryDto.prototype, "delivery", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Number of locations/suppliers',
        enum: enquiry_schema_1.LocationRangeEnum,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enquiry_schema_1.LocationRangeEnum),
    __metadata("design:type", String)
], CreateEnquiryDto.prototype, "numberOfLocations", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Hours of operation',
        enum: enquiry_schema_1.HoursOfOperationEnum,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enquiry_schema_1.HoursOfOperationEnum),
    __metadata("design:type", String)
], CreateEnquiryDto.prototype, "hoursOfOperation", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Certified scope',
        enum: enquiry_schema_1.CertifiedScopeEnum,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enquiry_schema_1.CertifiedScopeEnum),
    __metadata("design:type", String)
], CreateEnquiryDto.prototype, "certifiedScope", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Auditing delivery method',
        enum: enquiry_schema_1.AuditingDeliveryEnum,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enquiry_schema_1.AuditingDeliveryEnum),
    __metadata("design:type", String)
], CreateEnquiryDto.prototype, "auditingDelivery", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Industry of the requester' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEnquiryDto.prototype, "industry", void 0);
//# sourceMappingURL=create-enquiry.dto.js.map