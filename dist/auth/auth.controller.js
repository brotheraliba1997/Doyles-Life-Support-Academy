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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const swagger_1 = require("@nestjs/swagger");
const auth_email_login_dto_1 = require("./dto/auth-email-login.dto");
const auth_forgot_password_dto_1 = require("./dto/auth-forgot-password.dto");
const auth_reset_password_dto_1 = require("./dto/auth-reset-password.dto");
const auth_update_dto_1 = require("./dto/auth-update.dto");
const passport_1 = require("@nestjs/passport");
const auth_register_login_dto_1 = require("./dto/auth-register-login.dto");
const login_response_dto_1 = require("./dto/login-response.dto");
const user_1 = require("../users/domain/user");
const refresh_response_dto_1 = require("./dto/refresh-response.dto");
const auth_register_step1_dto_1 = require("./dto/auth-register-step1.dto");
const register_step1_response_dto_1 = require("./dto/register-step1-response.dto");
const auth_otp_verify_dto_1 = require("./dto/auth-otp-verify.dto");
const auth_resend_otp_dto_1 = require("./dto/auth-resend-otp.dto");
const resend_otp_response_dto_1 = require("./dto/resend-otp-response.dto");
const otp_verify_response_dto_1 = require("./dto/otp-verify-response.dto");
const register_response_dto_1 = require("./dto/register-response.dto");
const forgot_password_response_dto_1 = require("./dto/forgot-password-response.dto");
const reset_password_response_dto_1 = require("./dto/reset-password-response.dto");
const auth_forgot_password_otp_verify_dto_1 = require("./dto/auth-forgot-password-otp-verify.dto");
const forgot_password_otp_verify_response_dto_1 = require("./dto/forgot-password-otp-verify-response.dto");
const FirebaseLogin_dto_1 = require("./dto/FirebaseLogin.dto");
let AuthController = class AuthController {
    constructor(service) {
        this.service = service;
    }
    login(loginDto) {
        return this.service.validateLogin(loginDto);
    }
    async registerStep1(createUserDto) {
        return this.service.registerCreateUser(createUserDto);
    }
    async OTPVerify(otpVerifyDto) {
        return this.service.OTPVerify(otpVerifyDto);
    }
    async resendOtp(resendOtpDto) {
        return this.service.resendOtp(resendOtpDto);
    }
    async register(createUserDto, req) {
        return this.service.register(createUserDto, req.user);
    }
    async forgotPassword(forgotPasswordDto) {
        return this.service.forgotPassword(forgotPasswordDto);
    }
    async verifyForgotPasswordOtp(verifyOtpDto) {
        return this.service.verifyForgotPasswordOtp(verifyOtpDto);
    }
    async forgotPasswordReset(forgotPasswordDto) {
        return this.service.forgotPasswordReset(forgotPasswordDto);
    }
    resetPassword(resetPasswordDto) {
        return this.service.resetPassword(resetPasswordDto.resetToken, resetPasswordDto.password);
    }
    async firebaseLogin(dto) {
        return this.service.firebaseLogin(dto.token);
    }
    refresh(request) {
        return this.service.refreshToken({
            sessionId: request.user.sessionId,
            hash: request.user.hash,
        });
    }
    async logout(request) {
        await this.service.logout({
            sessionId: request.user.sessionId,
        });
    }
    update(request, userDto) {
        return this.service.update(request.user, userDto);
    }
    async delete(request) {
        return this.service.softDelete(request.user);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.SerializeOptions)({
        groups: ['me'],
    }),
    (0, common_1.Post)('email/login'),
    (0, swagger_1.ApiOkResponse)({ type: login_response_dto_1.LoginResponseSuccessDto }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_email_login_dto_1.AuthEmailLoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('email/register'),
    (0, swagger_1.ApiOkResponse)({ type: register_step1_response_dto_1.RegisterStep1ResponseDto }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_register_step1_dto_1.AuthRegisterStep1Dto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerStep1", null);
__decorate([
    (0, common_1.Post)('OTP/verify'),
    (0, swagger_1.ApiOkResponse)({ type: otp_verify_response_dto_1.OtpVerifyResponseDto }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_otp_verify_dto_1.AuthOtpVerifyDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "OTPVerify", null);
__decorate([
    (0, common_1.Post)('OTP/resend'),
    (0, swagger_1.ApiOkResponse)({ type: resend_otp_response_dto_1.ResendOtpResponseDto }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_resend_otp_dto_1.AuthResendOtpDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resendOtp", null);
__decorate([
    (0, common_1.Post)('/register/complete'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOkResponse)({ type: register_response_dto_1.RegisterResponseDto }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_register_login_dto_1.AuthRegisterLoginDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('forgot/password'),
    (0, swagger_1.ApiOkResponse)({ type: forgot_password_response_dto_1.ForgotPasswordResponseDto }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_forgot_password_dto_1.AuthForgotPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)('forgot/password/verify-otp'),
    (0, swagger_1.ApiOkResponse)({ type: forgot_password_otp_verify_response_dto_1.ForgotPasswordOtpVerifyResponseDto }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_forgot_password_otp_verify_dto_1.AuthForgotPasswordOtpVerifyDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyForgotPasswordOtp", null);
__decorate([
    (0, common_1.Post)('forgot/password/OTP/resend'),
    (0, swagger_1.ApiOkResponse)({ type: forgot_password_response_dto_1.ForgotPasswordResponseDto }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_forgot_password_dto_1.AuthForgotPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPasswordReset", null);
__decorate([
    (0, common_1.Post)('reset/password'),
    (0, swagger_1.ApiOkResponse)({ type: reset_password_response_dto_1.ResetPasswordResponseDto }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_reset_password_dto_1.AuthResetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Post)('social/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [FirebaseLogin_dto_1.FirebaseLoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "firebaseLogin", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOkResponse)({
        type: refresh_response_dto_1.RefreshResponseDto,
    }),
    (0, common_1.SerializeOptions)({
        groups: ['me'],
    }),
    (0, common_1.Post)('refresh'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt-refresh')),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)('logout'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.SerializeOptions)({
        groups: ['me'],
    }),
    (0, common_1.Patch)('me'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({
        type: user_1.User,
    }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, auth_update_dto_1.AuthUpdateDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)('me'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "delete", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)({
        path: 'auth',
        version: '1',
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map