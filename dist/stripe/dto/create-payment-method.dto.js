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
exports.CreatePaymentMethodDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreatePaymentMethodDto {
}
exports.CreatePaymentMethodDto = CreatePaymentMethodDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '4242424242424242',
        description: 'Card number (16 digits)',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(13, 19),
    __metadata("design:type", String)
], CreatePaymentMethodDto.prototype, "cardNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 12,
        description: 'Expiration month (1-12)',
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(12),
    __metadata("design:type", Number)
], CreatePaymentMethodDto.prototype, "expMonth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 2026,
        description: 'Expiration year (4 digits)',
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(2024),
    __metadata("design:type", Number)
], CreatePaymentMethodDto.prototype, "expYear", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '123',
        description: 'Card verification code (CVV/CVC)',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(3, 4),
    __metadata("design:type", String)
], CreatePaymentMethodDto.prototype, "cvc", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'John Doe',
        description: 'Cardholder name',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePaymentMethodDto.prototype, "cardholderName", void 0);
//# sourceMappingURL=create-payment-method.dto.js.map