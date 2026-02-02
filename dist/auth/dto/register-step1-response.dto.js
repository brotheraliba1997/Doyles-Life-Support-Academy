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
exports.RegisterStep1ResponseDto = exports.RegisterStep1ResponseDataDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class RegisterStep1ResponseDataDto {
}
exports.RegisterStep1ResponseDataDto = RegisterStep1ResponseDataDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: false, description: 'User verification status' }),
    __metadata("design:type", Boolean)
], RegisterStep1ResponseDataDto.prototype, "isUserVerified", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false, description: 'Profile completion status' }),
    __metadata("design:type", Boolean)
], RegisterStep1ResponseDataDto.prototype, "isCompleteProfile", void 0);
class RegisterStep1ResponseDto {
}
exports.RegisterStep1ResponseDto = RegisterStep1ResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '507f1f77bcf86cd799439011' }),
    __metadata("design:type", Object)
], RegisterStep1ResponseDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'test@example.com' }),
    __metadata("design:type", String)
], RegisterStep1ResponseDto.prototype, "userEmail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 201, description: 'Indicates whether the operation succeeded' }),
    __metadata("design:type", Object)
], RegisterStep1ResponseDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Registration completed successfully', description: 'Human-readable response message' }),
    __metadata("design:type", String)
], RegisterStep1ResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: RegisterStep1ResponseDataDto }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => RegisterStep1ResponseDataDto),
    __metadata("design:type", RegisterStep1ResponseDataDto)
], RegisterStep1ResponseDto.prototype, "data", void 0);
//# sourceMappingURL=register-step1-response.dto.js.map