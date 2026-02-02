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
exports.RegisterResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_1 = require("../../users/domain/user");
class RegisterDataDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Whether the user email is verified' }),
    __metadata("design:type", Boolean)
], RegisterDataDto.prototype, "isUserVerified", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Whether the user profile is complete' }),
    __metadata("design:type", Boolean)
], RegisterDataDto.prototype, "isCompleteProfile", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => user_1.User,
    }),
    __metadata("design:type", user_1.User)
], RegisterDataDto.prototype, "user", void 0);
class RegisterResponseDto {
}
exports.RegisterResponseDto = RegisterResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Indicates whether the operation succeeded' }),
    __metadata("design:type", Boolean)
], RegisterResponseDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: RegisterDataDto,
        description: 'Registration data containing user verification and profile completion status'
    }),
    __metadata("design:type", RegisterDataDto)
], RegisterResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Registration completed successfully', description: 'Human-readable response message' }),
    __metadata("design:type", String)
], RegisterResponseDto.prototype, "message", void 0);
//# sourceMappingURL=register-response.dto.js.map