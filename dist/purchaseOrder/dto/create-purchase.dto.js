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
exports.CreatePurchaseOrderDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreatePurchaseOrderDto {
}
exports.CreatePurchaseOrderDto = CreatePurchaseOrderDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique purchase order identifier provided by finance',
        example: 'PO-2025-00045',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePurchaseOrderDto.prototype, "poNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Student user ID associated with the request',
        example: '675f4aaf2b67a23d4c9f2941',
    }),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreatePurchaseOrderDto.prototype, "studentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Target course to enroll once the PO is approved',
        example: '675f4aaf2b67a23d4c9f2941',
    }),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreatePurchaseOrderDto.prototype, "courseId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Booking ID reference',
        example: '670bbb9871fa82325d15dfad',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreatePurchaseOrderDto.prototype, "BookingId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Finance reviewer/contact user ID',
        example: '6841ca06ebdfea1c5e6a0e73',
    }),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreatePurchaseOrderDto.prototype, "financialContactId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'URL or storage path of the uploaded bank slip / proof',
        example: 'https://cdn.kelmac.com/uploads/bank-slips/PO-2025-00045.png',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePurchaseOrderDto.prototype, "bankSlipUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Timestamp when the PO was submitted (defaults to current time if omitted)',
        example: '2025-02-18T10:30:00.000Z',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreatePurchaseOrderDto.prototype, "submittedAt", void 0);
//# sourceMappingURL=create-purchase.dto.js.map