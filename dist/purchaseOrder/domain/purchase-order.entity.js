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
exports.PurchaseOrderEntity = void 0;
const swagger_1 = require("@nestjs/swagger");
const purchase_schema_1 = require("../schema/purchase.schema");
class PurchaseOrderEntity {
    constructor(partial) {
        Object.assign(this, partial);
    }
}
exports.PurchaseOrderEntity = PurchaseOrderEntity;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '675f4aaf2b67a23d4c9f2941' }),
    __metadata("design:type", String)
], PurchaseOrderEntity.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'PO-2025-00045' }),
    __metadata("design:type", String)
], PurchaseOrderEntity.prototype, "poNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Student user ID associated with the order',
        example: '675f4aaf2b67a23d4c9f2941',
    }),
    __metadata("design:type", String)
], PurchaseOrderEntity.prototype, "student", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Course ID linked to this purchase order',
        example: '675f4aaf2b67a23d4c9f2941',
    }),
    __metadata("design:type", String)
], PurchaseOrderEntity.prototype, "course", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Finance reviewer/contact user ID',
        example: '6841ca06ebdfea1c5e6a0e73',
    }),
    __metadata("design:type", String)
], PurchaseOrderEntity.prototype, "financialContact", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Bank slip / proof of payment location',
        example: 'https://cdn.kelmac.com/uploads/bank-slips/PO-2025-00045.png',
    }),
    __metadata("design:type", String)
], PurchaseOrderEntity.prototype, "bankSlipUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: purchase_schema_1.PurchaseOrderStatusEnum,
        example: purchase_schema_1.PurchaseOrderStatusEnum.PENDING,
    }),
    __metadata("design:type", String)
], PurchaseOrderEntity.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date the purchase order was submitted',
        example: '2025-02-18T10:30:00.000Z',
    }),
    __metadata("design:type", Date)
], PurchaseOrderEntity.prototype, "submittedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Finance reviewer ID',
        example: '675f4aaf2b67a23d4c9f2941',
        required: false,
    }),
    __metadata("design:type", String)
], PurchaseOrderEntity.prototype, "reviewedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Timestamp when PO was reviewed',
        example: '2025-02-19T09:15:00.000Z',
        required: false,
    }),
    __metadata("design:type", Date)
], PurchaseOrderEntity.prototype, "reviewedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Finance notes or instructions',
        example: 'Payment verified via bank statement',
        required: false,
    }),
    __metadata("design:type", String)
], PurchaseOrderEntity.prototype, "decisionNotes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], PurchaseOrderEntity.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], PurchaseOrderEntity.prototype, "updatedAt", void 0);
//# sourceMappingURL=purchase-order.entity.js.map