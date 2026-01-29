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
exports.UpdatePurchaseOrderDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_purchase_dto_1 = require("./create-purchase.dto");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const purchase_schema_1 = require("../schema/purchase.schema");
class UpdatePurchaseOrderDto extends (0, mapped_types_1.PartialType)(create_purchase_dto_1.CreatePurchaseOrderDto) {
}
exports.UpdatePurchaseOrderDto = UpdatePurchaseOrderDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: purchase_schema_1.PurchaseOrderStatusEnum,
        description: 'Finance decision on the purchase order',
        example: purchase_schema_1.PurchaseOrderStatusEnum.APPROVED,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(purchase_schema_1.PurchaseOrderStatusEnum),
    __metadata("design:type", String)
], UpdatePurchaseOrderDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Finance reviewer user ID',
        example: '675f4aaf2b67a23d4c9f2941',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], UpdatePurchaseOrderDto.prototype, "reviewedBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Timestamp when finance completed the review',
        example: '2025-02-18T12:15:00.000Z',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdatePurchaseOrderDto.prototype, "reviewedAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Finance team comments/instructions',
        example: 'Payment verified via bank statement',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePurchaseOrderDto.prototype, "decisionNotes", void 0);
//# sourceMappingURL=update-purchase.dto.js.map