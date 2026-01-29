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
exports.CreateCheckoutSessionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateCheckoutSessionDto {
}
exports.CreateCheckoutSessionDto = CreateCheckoutSessionDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '671018fabc123456789ef013',
        description: 'Course ID to purchase',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCheckoutSessionDto.prototype, "courseId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '671018fabc123456789ef014',
        description: 'User ID making the purchase',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCheckoutSessionDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'http://localhost:3000/success',
        description: 'Success redirect URL',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCheckoutSessionDto.prototype, "successUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'http://localhost:3000/cancel',
        description: 'Cancel redirect URL',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCheckoutSessionDto.prototype, "cancelUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 5000,
        description: 'Price in cents (optional, will use course price if not provided)',
        required: false,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateCheckoutSessionDto.prototype, "priceInCents", void 0);
//# sourceMappingURL=create-checkout-session.dto.js.map