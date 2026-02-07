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
exports.OtpVerifyResponseDto = exports.OtpVerifyResponseDataDto = exports.OtpVerifyUserResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class OtpVerifyUserResponseDto {
}
exports.OtpVerifyUserResponseDto = OtpVerifyUserResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User ID' }),
    __metadata("design:type", Object)
], OtpVerifyUserResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'User verified status' }),
    __metadata("design:type", Boolean)
], OtpVerifyUserResponseDto.prototype, "isUserVerified", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Company verified status' }),
    __metadata("design:type", Boolean)
], OtpVerifyUserResponseDto.prototype, "isCompletedProfileVerified", void 0);
class OtpVerifyResponseDataDto {
}
exports.OtpVerifyResponseDataDto = OtpVerifyResponseDataDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'JWT access token' }),
    __metadata("design:type", String)
], OtpVerifyResponseDataDto.prototype, "token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'JWT refresh token' }),
    __metadata("design:type", String)
], OtpVerifyResponseDataDto.prototype, "refreshToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Token expiry timestamp (ms)' }),
    __metadata("design:type", Number)
], OtpVerifyResponseDataDto.prototype, "tokenExpires", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'OTP code (for debugging)' }),
    __metadata("design:type", String)
], OtpVerifyResponseDataDto.prototype, "otp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: OtpVerifyUserResponseDto, description: 'User information' }),
    __metadata("design:type", OtpVerifyUserResponseDto)
], OtpVerifyResponseDataDto.prototype, "user", void 0);
class OtpVerifyResponseDto {
}
exports.OtpVerifyResponseDto = OtpVerifyResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Indicates whether the operation succeeded' }),
    __metadata("design:type", Boolean)
], OtpVerifyResponseDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'OTP verified successfully', description: 'Human-readable response message' }),
    __metadata("design:type", String)
], OtpVerifyResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: OtpVerifyResponseDataDto }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => OtpVerifyResponseDataDto),
    __metadata("design:type", OtpVerifyResponseDataDto)
], OtpVerifyResponseDto.prototype, "data", void 0);
//# sourceMappingURL=otp-verify-response.dto.js.map