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
exports.AuthOtpVerifyDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class AuthOtpVerifyDto {
}
exports.AuthOtpVerifyDto = AuthOtpVerifyDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '507f1f77bcf86cd799439011', description: 'User ID' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], AuthOtpVerifyDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123456', description: 'OTP code' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AuthOtpVerifyDto.prototype, "otpCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'register', enum: ['register', 'forgot'], description: 'OTP type' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AuthOtpVerifyDto.prototype, "type", void 0);
//# sourceMappingURL=auth-otp-verify.dto.js.map