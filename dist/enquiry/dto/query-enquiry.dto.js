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
exports.QueryEnquiryDto = exports.SortEnquiryDto = exports.FilterEnquiryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const enquiry_schema_1 = require("../schema/enquiry.schema");
class FilterEnquiryDto {
}
exports.FilterEnquiryDto = FilterEnquiryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Filter by subject' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FilterEnquiryDto.prototype, "subject", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Filter by name' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FilterEnquiryDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Filter by email' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FilterEnquiryDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Filter by phone' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FilterEnquiryDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Filter by company' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FilterEnquiryDto.prototype, "company", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Filter by designation' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FilterEnquiryDto.prototype, "designation", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by enquiry type',
        enum: enquiry_schema_1.EnquiryTypeEnum,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enquiry_schema_1.EnquiryTypeEnum),
    __metadata("design:type", String)
], FilterEnquiryDto.prototype, "enquiryType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Filter by scheme', enum: enquiry_schema_1.SchemeEnum }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enquiry_schema_1.SchemeEnum),
    __metadata("design:type", String)
], FilterEnquiryDto.prototype, "scheme", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by training category',
        enum: enquiry_schema_1.TrainingCategoryEnum,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enquiry_schema_1.TrainingCategoryEnum),
    __metadata("design:type", String)
], FilterEnquiryDto.prototype, "trainingCategory", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by training type',
        enum: enquiry_schema_1.TrainingTypeEnum,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enquiry_schema_1.TrainingTypeEnum),
    __metadata("design:type", String)
], FilterEnquiryDto.prototype, "trainingType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by training delivery',
        enum: enquiry_schema_1.TrainingDeliveryEnum,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enquiry_schema_1.TrainingDeliveryEnum),
    __metadata("design:type", String)
], FilterEnquiryDto.prototype, "trainingDelivery", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by organization type',
        enum: enquiry_schema_1.OrganizationTypeEnum,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enquiry_schema_1.OrganizationTypeEnum),
    __metadata("design:type", String)
], FilterEnquiryDto.prototype, "organizationType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by language',
        enum: enquiry_schema_1.LanguageEnum,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enquiry_schema_1.LanguageEnum),
    __metadata("design:type", String)
], FilterEnquiryDto.prototype, "language", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by certifications held',
        enum: enquiry_schema_1.CertificationEnum,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enquiry_schema_1.CertificationEnum),
    __metadata("design:type", String)
], FilterEnquiryDto.prototype, "certificationsHeld", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by delivery',
        enum: enquiry_schema_1.DeliveryEnum,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enquiry_schema_1.DeliveryEnum),
    __metadata("design:type", String)
], FilterEnquiryDto.prototype, "delivery", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by certified scope',
        enum: enquiry_schema_1.CertifiedScopeEnum,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enquiry_schema_1.CertifiedScopeEnum),
    __metadata("design:type", String)
], FilterEnquiryDto.prototype, "certifiedScope", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by auditing delivery',
        enum: enquiry_schema_1.AuditingDeliveryEnum,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enquiry_schema_1.AuditingDeliveryEnum),
    __metadata("design:type", String)
], FilterEnquiryDto.prototype, "auditingDelivery", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Filter by industry' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FilterEnquiryDto.prototype, "industry", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Free text search across multiple fields',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FilterEnquiryDto.prototype, "search", void 0);
class SortEnquiryDto {
}
exports.SortEnquiryDto = SortEnquiryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Field to sort by',
        enum: [
            'createdAt',
            'updatedAt',
            'subject',
            'name',
            'email',
            'company',
            'numberOfLearners',
            'preferredLearningDate',
        ],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SortEnquiryDto.prototype, "orderBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Sort order', enum: ['ASC', 'DESC'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SortEnquiryDto.prototype, "order", void 0);
class QueryEnquiryDto {
}
exports.QueryEnquiryDto = QueryEnquiryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1, description: 'Page number' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => (value ? Number(value) : 1)),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], QueryEnquiryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 10, description: 'Items per page' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => (value ? Number(value) : 10)),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], QueryEnquiryDto.prototype, "limit", void 0);
//# sourceMappingURL=query-enquiry.dto.js.map