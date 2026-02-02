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
exports.ResendOtpResponseDto = exports.ResendOtpResponseDataDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class ResendOtpResponseDataDto {
}
exports.ResendOtpResponseDataDto = ResendOtpResponseDataDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: false, description: 'User verification status' }),
    __metadata("design:type", Boolean)
], ResendOtpResponseDataDto.prototype, "isUserVerified", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false, description: 'Profile completion status' }),
    __metadata("design:type", Boolean)
], ResendOtpResponseDataDto.prototype, "isCompleteProfile", void 0);
class ResendOtpResponseDto {
}
exports.ResendOtpResponseDto = ResendOtpResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], ResendOtpResponseDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'OTP sent successfully to your email' }),
    __metadata("design:type", String)
], ResendOtpResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: ResendOtpResponseDataDto }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => ResendOtpResponseDataDto),
    __metadata("design:type", ResendOtpResponseDataDto)
], ResendOtpResponseDto.prototype, "data", void 0);
//# sourceMappingURL=resend-otp-response.dto.js.map