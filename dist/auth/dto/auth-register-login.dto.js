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
exports.AuthRegisterLoginDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const lower_case_transformer_1 = require("../../utils/transformers/lower-case.transformer");
class AuthRegisterLoginDto {
}
exports.AuthRegisterLoginDto = AuthRegisterLoginDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'test1@example.com', type: String }),
    (0, class_transformer_1.Transform)(lower_case_transformer_1.lowerCaseTransformer),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], AuthRegisterLoginDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'John' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AuthRegisterLoginDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Doe' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AuthRegisterLoginDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'John Doe' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AuthRegisterLoginDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'orca-technologies' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AuthRegisterLoginDto.prototype, "company", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'web developer' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AuthRegisterLoginDto.prototype, "jobTitle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'hamzaali1997.h@gmail.com' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AuthRegisterLoginDto.prototype, "emailAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '923001234567', type: Number }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AuthRegisterLoginDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+92' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AuthRegisterLoginDto.prototype, "countryCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'PK' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AuthRegisterLoginDto.prototype, "isoCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1990-01-01T00:00:00.000Z' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], AuthRegisterLoginDto.prototype, "dob", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'male', enum: ['male', 'female', 'other'] }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AuthRegisterLoginDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123 Main Street, City, Country' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AuthRegisterLoginDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 24.8607, type: Number }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AuthRegisterLoginDto.prototype, "lat", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 67.0011, type: Number }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AuthRegisterLoginDto.prototype, "long", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Jane Doe' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AuthRegisterLoginDto.prototype, "emergencyContactName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'spouse' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AuthRegisterLoginDto.prototype, "emergencyRelation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+92' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AuthRegisterLoginDto.prototype, "emergencyCountryCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'PK' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AuthRegisterLoginDto.prototype, "emergencyIsoCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '923009876543' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AuthRegisterLoginDto.prototype, "emergencyPhoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'United State America' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AuthRegisterLoginDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'United State America' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AuthRegisterLoginDto.prototype, "industry", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'fcm_token_abc123xyz', type: String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AuthRegisterLoginDto.prototype, "deviceToken", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'android', enum: ['ios', 'android', 'web'], type: String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AuthRegisterLoginDto.prototype, "deviceType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 2, description: 'Role ID: 1=admin, 2=student, 3=instructor', type: Number }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AuthRegisterLoginDto.prototype, "role", void 0);
//# sourceMappingURL=auth-register-login.dto.js.map