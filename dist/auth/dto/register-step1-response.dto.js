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
exports.RegisterStep1ResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
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
    (0, swagger_1.ApiProperty)({ example: false, description: 'User verification status' }),
    __metadata("design:type", Boolean)
], RegisterStep1ResponseDto.prototype, "isUserVerified", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false, description: 'Profile completion status' }),
    __metadata("design:type", Boolean)
], RegisterStep1ResponseDto.prototype, "isCompleteProfile", void 0);
//# sourceMappingURL=register-step1-response.dto.js.map