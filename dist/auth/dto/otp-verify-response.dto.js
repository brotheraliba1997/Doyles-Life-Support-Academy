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
exports.OtpVerifyResponseDto = exports.RegisterStep1ResponseDataDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class RegisterStep1ResponseDataDto {
}
exports.RegisterStep1ResponseDataDto = RegisterStep1ResponseDataDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: false, description: 'User verification status' }),
    __metadata("design:type", Boolean)
], RegisterStep1ResponseDataDto.prototype, "isUserVerified", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'JWT access token' }),
    __metadata("design:type", String)
], RegisterStep1ResponseDataDto.prototype, "token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'JWT refresh token' }),
    __metadata("design:type", String)
], RegisterStep1ResponseDataDto.prototype, "refreshToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Token expiry timestamp (ms)' }),
    __metadata("design:type", Number)
], RegisterStep1ResponseDataDto.prototype, "tokenExpires", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false, description: 'Profile completion status' }),
    __metadata("design:type", Boolean)
], RegisterStep1ResponseDataDto.prototype, "isCompleteProfile", void 0);
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
    (0, swagger_1.ApiProperty)({ type: RegisterStep1ResponseDataDto }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => RegisterStep1ResponseDataDto),
    __metadata("design:type", RegisterStep1ResponseDataDto)
], OtpVerifyResponseDto.prototype, "data", void 0);
//# sourceMappingURL=otp-verify-response.dto.js.map