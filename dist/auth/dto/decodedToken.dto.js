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
exports.DecodedFirebaseTokenDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class FirebaseInfoDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'google.com' }),
    __metadata("design:type", String)
], FirebaseInfoDto.prototype, "sign_in_provider", void 0);
class DecodedFirebaseTokenDto {
}
exports.DecodedFirebaseTokenDto = DecodedFirebaseTokenDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'kZx1y2...' }),
    __metadata("design:type", String)
], DecodedFirebaseTokenDto.prototype, "uid", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'John Doe' }),
    __metadata("design:type", String)
], DecodedFirebaseTokenDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'user@example.com' }),
    __metadata("design:type", String)
], DecodedFirebaseTokenDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: FirebaseInfoDto }),
    __metadata("design:type", FirebaseInfoDto)
], DecodedFirebaseTokenDto.prototype, "firebase", void 0);
//# sourceMappingURL=decodedToken.dto.js.map