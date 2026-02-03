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
exports.ForgotPasswordOtpVerifyResponseDto = exports.ForgotPasswordOtpVerifyResponseDataDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ForgotPasswordOtpVerifyResponseDataDto {
}
exports.ForgotPasswordOtpVerifyResponseDataDto = ForgotPasswordOtpVerifyResponseDataDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Reset password token/hash' }),
    __metadata("design:type", String)
], ForgotPasswordOtpVerifyResponseDataDto.prototype, "resetToken", void 0);
class ForgotPasswordOtpVerifyResponseDto {
}
exports.ForgotPasswordOtpVerifyResponseDto = ForgotPasswordOtpVerifyResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Indicates whether the operation succeeded' }),
    __metadata("design:type", Boolean)
], ForgotPasswordOtpVerifyResponseDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'OTP verified successfully. You can now reset your password.', description: 'Human-readable response message' }),
    __metadata("design:type", String)
], ForgotPasswordOtpVerifyResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: ForgotPasswordOtpVerifyResponseDataDto }),
    __metadata("design:type", ForgotPasswordOtpVerifyResponseDataDto)
], ForgotPasswordOtpVerifyResponseDto.prototype, "data", void 0);
//# sourceMappingURL=forgot-password-otp-verify-response.dto.js.map