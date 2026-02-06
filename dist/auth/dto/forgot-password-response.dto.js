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
exports.ForgotPasswordResponseDto = exports.ForgotPasswordResponseDataDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ForgotPasswordResponseDataDto {
}
exports.ForgotPasswordResponseDataDto = ForgotPasswordResponseDataDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '507f1f77bcf86cd799439011', description: 'User ID' }),
    __metadata("design:type", Object)
], ForgotPasswordResponseDataDto.prototype, "id", void 0);
class ForgotPasswordResponseDto {
}
exports.ForgotPasswordResponseDto = ForgotPasswordResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Indicates whether the operation succeeded' }),
    __metadata("design:type", Boolean)
], ForgotPasswordResponseDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'If the email exists, a password reset OTP has been sent', description: 'Human-readable response message' }),
    __metadata("design:type", String)
], ForgotPasswordResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: ForgotPasswordResponseDataDto }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", ForgotPasswordResponseDataDto)
], ForgotPasswordResponseDto.prototype, "data", void 0);
//# sourceMappingURL=forgot-password-response.dto.js.map