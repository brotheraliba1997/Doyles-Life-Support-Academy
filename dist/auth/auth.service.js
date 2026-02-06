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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const ms_1 = __importDefault(require("ms"));
const crypto_1 = __importDefault(require("crypto"));
const random_string_generator_util_1 = require("@nestjs/common/utils/random-string-generator.util");
const jwt_1 = require("@nestjs/jwt");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const auth_providers_enum_1 = require("./auth-providers.enum");
const config_1 = require("@nestjs/config");
const users_service_1 = require("../users/users.service");
const mail_service_1 = require("../mail/mail.service");
const roles_enum_1 = require("../roles/roles.enum");
const session_service_1 = require("../session/session.service");
const statuses_enum_1 = require("../statuses/statuses.enum");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const otp_schema_1 = require("../users/schema/otp.schema");
const isuerOtp_schema_1 = require("../users/schema/isuerOtp.schema");
let AuthService = class AuthService {
    constructor(jwtService, usersService, sessionService, mailService, configService, otpModel, userOtpModel) {
        this.jwtService = jwtService;
        this.usersService = usersService;
        this.sessionService = sessionService;
        this.mailService = mailService;
        this.configService = configService;
        this.otpModel = otpModel;
        this.userOtpModel = userOtpModel;
    }
    async validateLogin(loginDto) {
        const user = await this.usersService.findByEmail(loginDto.email);
        if (!user) {
            throw new common_1.UnprocessableEntityException({
                success: false,
                message: 'User not found',
            });
        }
        if (user.provider !== auth_providers_enum_1.AuthProvidersEnum.email) {
            throw new common_1.UnprocessableEntityException({
                success: false,
                message: `needLoginViaProvider:${user.provider}`,
            });
        }
        if (!user.password) {
            throw new common_1.UnprocessableEntityException({
                success: false,
                message: 'Incorrect password',
            });
        }
        const isValidPassword = await bcryptjs_1.default.compare(loginDto.password, user.password);
        if (!isValidPassword) {
            throw new common_1.UnprocessableEntityException({
                success: false,
                message: 'Incorrect password',
            });
        }
        const hash = crypto_1.default
            .createHash('sha256')
            .update((0, random_string_generator_util_1.randomStringGenerator)())
            .digest('hex');
        const session = await this.sessionService.create({
            user,
            hash,
        });
        const userOtp = await this.userOtpModel.findOne({
            userId: new mongoose_2.Types.ObjectId(user.id),
            type: isuerOtp_schema_1.UserOtpType.EMAIL_VERIFICATION,
            isUsed: false,
            email: user.email,
        });
        const { token, refreshToken, tokenExpires } = await this.getTokensData({
            id: user.id,
            role: user.role,
            sessionId: session.id,
            hash,
        });
        const userWithFlags = {
            ...user,
            isUserVerified: userOtp ? false : user.isUserVerified,
            isCompanyVerified: user.isCompanyVerified || false,
        };
        return {
            success: true,
            message: 'Login successful',
            data: {
                user: userWithFlags,
                token,
                refreshToken,
                tokenExpires,
            },
        };
    }
    async validateSocialLogin(authProvider, socialData) {
        let user = null;
        const socialEmail = socialData.email?.toLowerCase();
        let userByEmail = null;
        if (socialEmail) {
            userByEmail = await this.usersService.findByEmail(socialEmail);
        }
        if (socialData.id) {
            user = await this.usersService.findBySocialIdAndProvider({
                socialId: socialData.id,
                provider: authProvider,
            });
        }
        if (user) {
            if (socialEmail && !userByEmail) {
                user.email = socialEmail;
            }
            await this.usersService.update(user.id, user);
        }
        else if (userByEmail) {
            user = userByEmail;
        }
        else if (socialData.id) {
            const role = {
                id: roles_enum_1.RoleEnum.student,
            };
            const status = {
                id: statuses_enum_1.StatusEnum.active,
            };
            user = await this.usersService.create({
                email: socialEmail ?? null,
                firstName: socialData.firstName ?? null,
                lastName: socialData.lastName ?? null,
                socialId: socialData.id,
                provider: authProvider,
                role,
                status,
                company: null,
                jobTitle: null,
                emailAddress: null,
                phoneNumber: null,
                country: null,
                industry: null,
                currency: null,
            });
            user = await this.usersService.findById(user.id);
        }
        if (!user) {
            throw new common_1.UnprocessableEntityException({
                success: false,
                message: 'User not found',
            });
        }
        const hash = crypto_1.default
            .createHash('sha256')
            .update((0, random_string_generator_util_1.randomStringGenerator)())
            .digest('hex');
        const session = await this.sessionService.create({
            user,
            hash,
        });
        const { token: jwtToken, refreshToken, tokenExpires, } = await this.getTokensData({
            id: user.id,
            role: user.role,
            sessionId: session.id,
            hash,
        });
        return {
            success: true,
            message: 'Login successful',
            data: {
                user,
                token: jwtToken,
                refreshToken,
                tokenExpires,
            },
        };
    }
    async registerCreateUser(dto) {
        const existingUser = await this.usersService.findByEmail(dto.email);
        if (existingUser) {
            throw new common_1.UnprocessableEntityException({
                success: false,
                message: 'User already exists',
                errors: {
                    email: 'emailAlreadyExists',
                },
            });
        }
        const user = await this.usersService.create({
            email: dto.email,
            password: dto.password,
            firstName: null,
            lastName: null,
            company: '',
            jobTitle: '',
            emailAddress: dto.email,
            phoneNumber: 0,
            country: '',
            industry: '',
            role: {
                id: roles_enum_1.RoleEnum.student,
            },
            status: {
                id: statuses_enum_1.StatusEnum.inactive,
            },
            isUserVerified: false,
            isCompanyVerified: false,
        });
        await this.userOtpModel.create({
            userId: new mongoose_2.Types.ObjectId(user.id),
            code: "123456",
            email: user.email,
            type: isuerOtp_schema_1.UserOtpType.REGISTER,
            expiresAt: new Date(Date.now() + 10 * 60 * 1000),
            isUsed: false,
        });
        return {
            success: true,
            data: {
                isUserVerified: user.isUserVerified,
                isCompleteProfile: user.isCompanyVerified,
                id: user.id,
                email: user.email || dto.email,
            },
            message: 'Registration completed successfully',
        };
    }
    async OTPVerify(dto) {
        if (typeof dto.userId === 'string' && !mongoose_2.Types.ObjectId.isValid(dto.userId)) {
            throw new common_1.UnprocessableEntityException({
                success: false,
                message: 'Your id is not valid',
            });
        }
        const userFindOutById = await this.usersService.findById(dto.userId);
        if (!userFindOutById) {
            throw new common_1.UnprocessableEntityException({
                success: false,
                message: 'User not found',
            });
        }
        const otpType = dto.type === 'register' ? isuerOtp_schema_1.UserOtpType.REGISTER :
            dto.type === 'forgot' ? isuerOtp_schema_1.UserOtpType.FORGOT_PASSWORD :
                isuerOtp_schema_1.UserOtpType.EMAIL_VERIFICATION;
        const userOtp = await this.userOtpModel.findOneAndUpdate({
            userId: new mongoose_2.Types.ObjectId(userFindOutById.id),
            code: dto.otpCode,
            type: otpType,
            isUsed: false,
            expiresAt: { $gt: new Date() },
        }, {
            $set: {
                isUsed: true,
                usedAt: new Date(),
            },
        }, { new: true });
        if (!userOtp) {
            throw new common_1.UnprocessableEntityException({
                success: false,
                message: 'Invalid or expired OTP',
            });
        }
        await this.usersService.updateEmailVerified(userFindOutById.id, true);
        const updatedUser = await this.usersService.update(userFindOutById.id, {
            isUserVerified: true,
        });
        if (!updatedUser) {
            throw new common_1.UnprocessableEntityException({
                success: false,
                message: 'User not found',
            });
        }
        const userResponse = {
            id: updatedUser.id,
            email: updatedUser.email,
            isUserVerified: updatedUser.isUserVerified,
            isCompanyVerified: updatedUser.isCompanyVerified || false,
        };
        const hash = crypto_1.default
            .createHash('sha256')
            .update((0, random_string_generator_util_1.randomStringGenerator)())
            .digest('hex');
        const session = await this.sessionService.create({
            user: updatedUser,
            hash,
        });
        const { token, refreshToken, tokenExpires } = await this.getTokensData({
            id: updatedUser.id,
            role: updatedUser.role,
            sessionId: session.id,
            hash,
        });
        return {
            success: true,
            message: 'OTP verified successfully',
            data: {
                token,
                refreshToken,
                tokenExpires,
                otp: userOtp.code,
                user: userResponse,
            },
        };
    }
    async resendOtp(dto) {
        if (typeof dto.userId === 'string' && !mongoose_2.Types.ObjectId.isValid(dto.userId)) {
            throw new common_1.UnprocessableEntityException({
                success: false,
                message: 'Your id is not valid',
            });
        }
        const user = await this.usersService.findById(dto.userId);
        if (!user) {
            throw new common_1.UnprocessableEntityException({
                success: false,
                message: 'User not found',
            });
        }
        const otpCode = '123456';
        const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
        await this.userOtpModel.findOneAndUpdate({
            type: isuerOtp_schema_1.UserOtpType.REGISTER,
            isUsed: false,
            expiresAt: { $gt: new Date() },
            $or: [
                { userId: new mongoose_2.Types.ObjectId(user.id) },
                { email: user.email }
            ]
        }, {
            $set: {
                code: otpCode,
                expiresAt: otpExpiresAt,
                userId: new mongoose_2.Types.ObjectId(user.id),
                email: user.email,
            }
        }, { new: true, upsert: true });
        const userResponse = {
            id: user.id,
            isUserVerified: user.isUserVerified || false,
            isCompanyVerified: user.isCompanyVerified || false,
        };
        return {
            success: true,
            message: 'OTP sent successfully to your email',
            data: {
                otp: otpCode,
                otpExpiresAt: otpExpiresAt,
                user: userResponse,
            },
        };
    }
    async register(dto, jwtPayload) {
        const existingUser = await this.usersService.findByEmail(dto.email);
        if (!existingUser) {
            throw new common_1.UnprocessableEntityException({
                success: false,
                message: 'User not found ',
            });
        }
        const updatedUser = await this.usersService.update(existingUser?.id, {
            email: existingUser.email,
            password: existingUser.password,
            firstName: dto.firstName,
            lastName: dto.lastName,
            fullName: dto.fullName,
            company: dto.company ?? null,
            jobTitle: dto.jobTitle ?? null,
            emailAddress: dto.emailAddress ?? dto.email,
            phoneNumber: dto.phoneNumber ?? null,
            country: dto.country ?? null,
            industry: dto.industry ?? null,
            dob: dto.dob ? new Date(dto.dob) : undefined,
            countryCode: dto.countryCode,
            isoCode: dto.isoCode,
            gender: dto.gender,
            address: dto.address,
            lat: dto.lat,
            long: dto.long,
            emergencyContactName: dto.emergencyContactName,
            emergencyRelation: dto.emergencyRelation,
            emergencyCountryCode: dto.emergencyCountryCode,
            emergencyIsoCode: dto.emergencyIsoCode,
            emergencyPhoneNumber: dto.emergencyPhoneNumber,
            deviceToken: dto.deviceToken,
            deviceType: dto.deviceType,
            role: dto.role ? { id: dto.role } : undefined,
            isUserVerified: true,
            isCompanyVerified: true,
        });
        if (!updatedUser) {
            throw new common_1.UnprocessableEntityException({
                success: false,
                message: 'Registration failed',
            });
        }
        let token;
        let refreshToken;
        let tokenExpires;
        if (jwtPayload?.sessionId) {
            const existingSession = await this.sessionService.findById(jwtPayload.sessionId);
            if (!existingSession) {
                throw new common_1.UnprocessableEntityException({
                    success: false,
                    message: 'Session not found',
                });
            }
            if (existingSession && existingSession.user?.id === updatedUser.id) {
                const hash = crypto_1.default.createHash('sha256').update((0, random_string_generator_util_1.randomStringGenerator)()).digest('hex');
                await this.sessionService.update(existingSession.id, { hash });
                const tokens = await this.getTokensData({
                    id: updatedUser.id,
                    role: updatedUser.role,
                    sessionId: existingSession.id,
                    hash,
                });
                token = tokens.token;
                refreshToken = tokens.refreshToken;
                tokenExpires = tokens.tokenExpires;
            }
            else {
                const hash = crypto_1.default.createHash('sha256').update((0, random_string_generator_util_1.randomStringGenerator)()).digest('hex');
                const session = await this.sessionService.create({
                    user: updatedUser,
                    hash,
                });
                const tokens = await this.getTokensData({
                    id: updatedUser.id,
                    role: updatedUser.role,
                    sessionId: session.id,
                    hash,
                });
                token = tokens.token;
                refreshToken = tokens.refreshToken;
                tokenExpires = tokens.tokenExpires;
            }
        }
        else {
            const hash = crypto_1.default.createHash('sha256').update((0, random_string_generator_util_1.randomStringGenerator)()).digest('hex');
            const session = await this.sessionService.create({
                user: updatedUser,
                hash,
            });
            const tokens = await this.getTokensData({
                id: updatedUser.id,
                role: updatedUser.role,
                sessionId: session.id,
                hash,
            });
            token = tokens.token;
            refreshToken = tokens.refreshToken;
            tokenExpires = tokens.tokenExpires;
        }
        return {
            success: true,
            data: {
                token,
                refreshToken,
                tokenExpires,
                user: updatedUser,
            },
            message: 'Registration completed successfully',
        };
    }
    async forgotPassword(dto) {
        if (dto.userId !== undefined && dto.userId !== null) {
            if (typeof dto.userId === 'string' && !mongoose_2.Types.ObjectId.isValid(dto.userId)) {
                throw new common_1.UnprocessableEntityException({
                    success: false,
                    message: 'Your id is not valid',
                });
            }
        }
        if (dto.email !== undefined && dto.email !== null && dto.email === '') {
            throw new common_1.UnprocessableEntityException({
                success: false,
                message: 'Your email is not valid',
            });
        }
        const user = dto.userId ? await this.usersService.findById(dto.userId) : await this.usersService.findByEmail(dto?.email);
        if (!user) {
            throw new common_1.UnprocessableEntityException({
                success: false,
                message: 'User not found',
            });
        }
        const tokenExpiresIn = this.configService.getOrThrow('auth.forgotExpires', {
            infer: true,
        });
        const tokenExpires = Date.now() + (0, ms_1.default)(tokenExpiresIn);
        const hash = await this.jwtService.signAsync({
            forgotUserId: user.id,
        }, {
            secret: this.configService.getOrThrow('auth.forgotSecret', {
                infer: true,
            }),
            expiresIn: tokenExpiresIn,
        });
        try {
            const otpCode = '123456';
            const otpExpiresAt = new Date(tokenExpires);
            await this.otpModel.create({
                code: otpCode,
                email: user?.email,
                userId: user.id,
                type: otp_schema_1.OtpType.FORGOT_PASSWORD,
                expiresAt: otpExpiresAt,
                isUsed: false,
            });
            await this.mailService.forgotPassword({
                to: user?.email,
                data: {
                    hash,
                    tokenExpires,
                    otp: otpCode,
                },
            });
            return {
                success: true,
                message: 'If the email exists, a password reset OTP has been sent',
                data: {
                    id: user?.id,
                    email: user?.email,
                },
            };
        }
        catch (error) {
            throw new common_1.UnprocessableEntityException({
                success: false,
                message: 'Failed to send forgot password email',
            });
        }
    }
    async verifyForgotPasswordOtp(dto) {
        if (dto.userId !== undefined && dto.userId !== null) {
            if (typeof dto.userId === 'string' && !mongoose_2.Types.ObjectId.isValid(dto.userId)) {
                throw new common_1.UnprocessableEntityException({
                    success: false,
                    message: 'Your id is not valid',
                });
            }
        }
        if (dto.email !== undefined && dto.email !== null && dto.email === '') {
            throw new common_1.UnprocessableEntityException({
                success: false,
                message: 'Your email is not valid',
            });
        }
        const user = dto.userId ? await this.usersService.findById(dto.userId) : await this.usersService.findByEmail(dto?.email);
        if (!user) {
            throw new common_1.UnprocessableEntityException({
                success: false,
                message: 'User not found',
            });
        }
        const otpRecord = await this.otpModel
            .findOne({
            email: user?.email,
            userId: user?.id,
            code: dto.otpCode,
            type: otp_schema_1.OtpType.FORGOT_PASSWORD,
            isUsed: false,
        })
            .sort({ createdAt: -1 })
            .exec();
        if (!otpRecord) {
            throw new common_1.UnprocessableEntityException({
                success: false,
                message: 'Invalid or expired OTP',
            });
        }
        if (new Date() > otpRecord.expiresAt) {
            throw new common_1.UnprocessableEntityException({
                success: false,
                message: 'OTP has expired',
            });
        }
        otpRecord.isUsed = true;
        otpRecord.usedAt = new Date();
        await otpRecord.save();
        const tokenExpiresIn = this.configService.getOrThrow('auth.forgotExpires', {
            infer: true,
        });
        const hash = await this.jwtService.signAsync({
            forgotUserId: user.id,
        }, {
            secret: this.configService.getOrThrow('auth.forgotSecret', {
                infer: true,
            }),
            expiresIn: tokenExpiresIn,
        });
        return {
            success: true,
            message: 'OTP verified successfully. You can now reset your password.',
            data: {
                resetToken: hash,
            },
        };
    }
    async forgotPasswordReset(dto) {
        if (dto.userId !== undefined && dto.userId !== null) {
            if (typeof dto.userId === 'string' && !mongoose_2.Types.ObjectId.isValid(dto.userId)) {
                throw new common_1.UnprocessableEntityException({
                    success: false,
                    message: 'Your id is not valid',
                });
            }
        }
        if (dto.email !== undefined && dto.email !== null && dto.email === '') {
            throw new common_1.UnprocessableEntityException({
                success: false,
                message: 'Your email is not valid',
            });
        }
        const user = dto.userId ? await this.usersService.findById(dto.userId) : await this.usersService.findByEmail(dto?.email);
        if (!user) {
            throw new common_1.UnprocessableEntityException({
                success: false,
                message: 'User not found',
            });
        }
        const tokenExpiresIn = this.configService.getOrThrow('auth.forgotExpires', {
            infer: true,
        });
        const tokenExpires = Date.now() + (0, ms_1.default)(tokenExpiresIn);
        const hash = await this.jwtService.signAsync({
            forgotUserId: user.id,
        }, {
            secret: this.configService.getOrThrow('auth.forgotSecret', {
                infer: true,
            }),
            expiresIn: tokenExpiresIn,
        });
        try {
            const otpCode = '123456';
            const otpExpiresAt = new Date(tokenExpires);
            await this.otpModel.findOneAndUpdate({
                type: otp_schema_1.OtpType.FORGOT_PASSWORD,
                isUsed: false,
                expiresAt: { $gt: new Date() },
                $or: [
                    { userId: user?.id },
                    { email: user?.email }
                ]
            }, {
                $set: {
                    code: otpCode,
                    expiresAt: otpExpiresAt,
                    userId: user.id,
                    email: user.email,
                    resendCount: 0
                }
            }, { new: true, upsert: true });
            await this.mailService.forgotPasswordReset({
                to: user?.email,
                data: {
                    hash,
                    tokenExpires,
                    otp: otpCode,
                },
            });
            return {
                success: true,
                message: 'If the email exists, a password reset OTP has been sent',
                data: {
                    id: user?.id,
                    email: user?.email,
                },
            };
        }
        catch (error) {
            throw new common_1.UnprocessableEntityException({
                success: false,
                message: 'Failed to send forgot password reset email',
            });
        }
    }
    async resetPassword(resetToken, password) {
        let userId;
        try {
            const jwtData = await this.jwtService.verifyAsync(resetToken, {
                secret: this.configService.getOrThrow('auth.forgotSecret', {
                    infer: true,
                }),
            });
            userId = jwtData.forgotUserId;
        }
        catch {
            throw new common_1.UnprocessableEntityException({
                success: false,
                message: 'Invalid reset password token',
            });
        }
        const user = await this.usersService.findById(userId);
        if (!user) {
            throw new common_1.UnprocessableEntityException({
                success: false,
                message: 'User not found',
            });
        }
        await this.sessionService.deleteByUserId({ userId: user.id });
        await this.usersService.update(user.id, {
            password: password,
        });
        return {
            success: true,
            message: 'Password reset successfully',
        };
    }
    async firebaseLogin(firebaseToken, provider) {
        let decodedToken;
        try {
            decodedToken = this.jwtService.decode(firebaseToken);
            if (!decodedToken) {
                throw new common_1.UnprocessableEntityException({
                    success: false,
                    message: 'Invalid Firebase token',
                });
            }
        }
        catch (error) {
            throw new common_1.UnprocessableEntityException({
                success: false,
                message: 'Invalid Firebase token',
            });
        }
        const uid = decodedToken.uid || decodedToken.sub || decodedToken.user_id;
        const email = decodedToken.email;
        const name = decodedToken.name;
        if (!uid) {
            throw new common_1.UnprocessableEntityException({
                success: false,
                message: 'User ID not found in Firebase token',
            });
        }
        if (!email) {
            throw new common_1.UnprocessableEntityException({
                success: false,
                message: 'Email not found in Firebase token',
            });
        }
        let user = await this.usersService.findByFirebaseUid(uid);
        if (!user) {
            const nameParts = name ? name.split(' ') : [];
            const firstName = nameParts[0] || null;
            const lastName = nameParts.slice(1).join(' ') || null;
            const lat = decodedToken.latitude || null;
            const long = decodedToken.longitude || null;
            user = await this.usersService.create({
                provider: provider,
                socialId: uid,
                email: email,
                firstName: firstName,
                lastName: lastName,
                fullName: name || null,
                company: '',
                jobTitle: '',
                emailAddress: email,
                phoneNumber: 0,
                country: '',
                industry: '',
                role: {
                    id: roles_enum_1.RoleEnum.student,
                },
                status: {
                    id: statuses_enum_1.StatusEnum.inactive,
                },
                isUserVerified: true,
                isCompanyVerified: false,
                lat: lat,
                long: long,
            });
        }
        const hash = crypto_1.default
            .createHash('sha256')
            .update((0, random_string_generator_util_1.randomStringGenerator)())
            .digest('hex');
        const session = await this.sessionService.create({
            user,
            hash,
        });
        const { token, refreshToken, tokenExpires } = await this.getTokensData({
            id: user.id,
            role: user.role,
            sessionId: session.id,
            hash,
        });
        const userWithFlags = {
            ...user,
            isUserVerified: user.isUserVerified,
            isCompanyVerified: user.isCompanyVerified || false,
        };
        return {
            success: true,
            message: 'Login successful',
            data: {
                user: userWithFlags,
                token,
                refreshToken,
                tokenExpires,
            },
        };
    }
    async me(userJwtPayload) {
        return this.usersService.findById(userJwtPayload.id);
    }
    async update(userJwtPayload, userDto) {
        const currentUser = await this.usersService.findById(userJwtPayload.id);
        if (!currentUser) {
            throw new common_1.UnprocessableEntityException({
                success: false,
                message: 'User not found',
            });
        }
        if (userDto.password) {
            if (!userDto.oldPassword) {
                throw new common_1.UnprocessableEntityException({
                    success: false,
                    message: 'Missing old password',
                });
            }
            if (!currentUser.password) {
                throw new common_1.UnprocessableEntityException({
                    success: false,
                    message: 'Incorrect old password',
                });
            }
            const isValidOldPassword = await bcryptjs_1.default.compare(userDto.oldPassword, currentUser.password);
            if (!isValidOldPassword) {
                throw new common_1.UnprocessableEntityException({
                    success: false,
                    errors: {
                        oldPassword: 'incorrectOldPassword',
                    },
                });
            }
            else {
                await this.sessionService.deleteByUserIdWithExclude({
                    userId: currentUser.id,
                    excludeSessionId: userJwtPayload.sessionId,
                });
            }
        }
        if (userDto.email && userDto.email !== currentUser.email) {
            const userByEmail = await this.usersService.findByEmail(userDto.email);
            if (userByEmail && userByEmail.id !== currentUser.id) {
                throw new common_1.UnprocessableEntityException({
                    success: false,
                    message: 'Email already exists',
                });
            }
            const hash = await this.jwtService.signAsync({
                confirmEmailUserId: currentUser.id,
                newEmail: userDto.email,
            }, {
                secret: this.configService.getOrThrow('auth.confirmEmailSecret', {
                    infer: true,
                }),
                expiresIn: this.configService.getOrThrow('auth.confirmEmailExpires', {
                    infer: true,
                }),
            });
            await this.mailService.confirmNewEmail({
                to: userDto.email,
                data: {
                    hash,
                },
            });
        }
        delete userDto.email;
        delete userDto.oldPassword;
        await this.usersService.update(userJwtPayload.id, userDto);
        return this.usersService.findById(userJwtPayload.id);
    }
    async refreshToken(data) {
        const session = await this.sessionService.findById(data.sessionId);
        if (!session) {
            throw new common_1.UnauthorizedException();
        }
        if (session.hash !== data.hash) {
            throw new common_1.UnauthorizedException();
        }
        const hash = crypto_1.default
            .createHash('sha256')
            .update((0, random_string_generator_util_1.randomStringGenerator)())
            .digest('hex');
        const user = await this.usersService.findById(session.user.id);
        if (!user?.role) {
            throw new common_1.UnauthorizedException();
        }
        await this.sessionService.update(session.id, {
            hash,
        });
        const { token, refreshToken, tokenExpires } = await this.getTokensData({
            id: session.user.id,
            role: {
                id: user.role.id,
            },
            sessionId: session.id,
            hash,
        });
        return {
            token,
            refreshToken,
            tokenExpires,
        };
    }
    async softDelete(user) {
        await this.usersService.remove(user.id);
    }
    async logout(data) {
        return this.sessionService.deleteById(data.sessionId);
    }
    async verifySocketToken(token) {
        if (!token) {
            throw new common_1.UnauthorizedException('Token is required');
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.configService.getOrThrow('auth.secret', { infer: true }),
            });
            return payload;
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid token');
        }
    }
    async getTokensData(data) {
        const tokenExpiresIn = this.configService.getOrThrow('auth.expires', {
            infer: true,
        });
        const tokenExpires = Date.now() + (0, ms_1.default)(tokenExpiresIn);
        const [token, refreshToken] = await Promise.all([
            await this.jwtService.signAsync({
                id: data.id,
                role: data.role,
                sessionId: data.sessionId,
            }, {
                secret: this.configService.getOrThrow('auth.secret', { infer: true }),
                expiresIn: tokenExpiresIn,
            }),
            await this.jwtService.signAsync({
                sessionId: data.sessionId,
                hash: data.hash,
            }, {
                secret: this.configService.getOrThrow('auth.refreshSecret', {
                    infer: true,
                }),
                expiresIn: this.configService.getOrThrow('auth.refreshExpires', {
                    infer: true,
                }),
            }),
        ]);
        return {
            token,
            refreshToken,
            tokenExpires,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(5, (0, mongoose_1.InjectModel)(otp_schema_1.OtpSchemaClass.name)),
    __param(6, (0, mongoose_1.InjectModel)(isuerOtp_schema_1.UserOtpSchemaClass.name)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        users_service_1.UsersService,
        session_service_1.SessionService,
        mail_service_1.MailService,
        config_1.ConfigService,
        mongoose_2.Model,
        mongoose_2.Model])
], AuthService);
//# sourceMappingURL=auth.service.js.map