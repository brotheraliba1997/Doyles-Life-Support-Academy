import {
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import ms from 'ms';
import crypto from 'crypto';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';
import { AuthEmailLoginDto } from './dto/auth-email-login.dto';
import { AuthUpdateDto } from './dto/auth-update.dto';
import { AuthProvidersEnum } from './auth-providers.enum';
import { SocialInterface } from '../social/interfaces/social.interface';
import { AuthRegisterLoginDto } from './dto/auth-register-login.dto';
import { NullableType } from '../utils/types/nullable.type';
import { LoginResponseDto } from './dto/login-response.dto';
import { ConfigService } from '@nestjs/config';
import { JwtRefreshPayloadType } from './strategies/types/jwt-refresh-payload.type';
import { JwtPayloadType } from './strategies/types/jwt-payload.type';
import { UsersService } from '../users/users.service';
import { AllConfigType } from '../config/config.type';
import { MailService } from '../mail/mail.service';
import { RoleEnum } from '../roles/roles.enum';
import { Session } from '../session/domain/session';
import { SessionService } from '../session/session.service';
import { StatusEnum } from '../statuses/statuses.enum';
import { User } from '../users/domain/user';
import { AuthRegisterStep1Dto } from './dto/auth-register-step1.dto';
import { AuthOtpVerifyDto } from './dto/auth-otp-verify.dto';
import { AuthResendOtpDto } from './dto/auth-resend-otp.dto';
import { ResendOtpResponseDto } from './dto/resend-otp-response.dto';
import { OtpVerifyResponseDto } from './dto/otp-verify-response.dto';
import { RegisterStep1ResponseDto } from './dto/register-step1-response.dto';
import { RegisterResponseDto } from './dto/register-response.dto';
import { ForgotPasswordResponseDto } from './dto/forgot-password-response.dto';
import { ResetPasswordResponseDto } from './dto/reset-password-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private sessionService: SessionService,
    private mailService: MailService,
    private configService: ConfigService<AllConfigType>,
  ) {}

  async validateLogin(loginDto: AuthEmailLoginDto): Promise<LoginResponseDto> {
    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          email: 'notFound',
        },
      });
    }

    if (user.provider !== AuthProvidersEnum.email) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          email: `needLoginViaProvider:${user.provider}`,
        },
      });
    }

    if (!user.password) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          password: 'incorrectPassword',
        },
      });
    }

    const isValidPassword = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          password: 'incorrectPassword',
        },
      });
    }

    const hash = crypto
      .createHash('sha256')
      .update(randomStringGenerator())
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

    return {
      refreshToken,
      token,
      tokenExpires,
      user,
    };
  }

  async validateSocialLogin(
    authProvider: string,
    socialData: SocialInterface,
  ): Promise<LoginResponseDto> {
    let user: NullableType<User> = null;
    const socialEmail = socialData.email?.toLowerCase();
    let userByEmail: NullableType<User> = null;

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
    } else if (userByEmail) {
      user = userByEmail;
    } else if (socialData.id) {
      const role = {
        id: RoleEnum.student,
      };
      const status = {
        id: StatusEnum.active,
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
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          user: 'userNotFound',
        },
      });
    }

    const hash = crypto
      .createHash('sha256')
      .update(randomStringGenerator())
      .digest('hex');

    const session = await this.sessionService.create({
      user,
      hash,
    });

    const {
      token: jwtToken,
      refreshToken,
      tokenExpires,
    } = await this.getTokensData({
      id: user.id,
      role: user.role,
      sessionId: session.id,
      hash,
    });

    return {
      refreshToken,
      token: jwtToken,
      tokenExpires,
      user,
    };
  }



  async registerStep1(dto: AuthRegisterStep1Dto): Promise<RegisterStep1ResponseDto> {
    // Check if user already exists
    const existingUser = await this.usersService.findByEmail(dto.email);
    if (existingUser) {
      throw new UnprocessableEntityException({
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
        id: RoleEnum.student,
      },
      status: {
        id: StatusEnum.inactive,
      },
    });

    // const otpCode = '123456';
    // const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); 

    const isCompleteProfile = !!(
      user.firstName &&
      user.lastName &&
      user.fullName &&
      user.phoneNumber &&
      user.address
    );

    const isUserVerified = user.isEmailVerified || false;
    return {
      userId: user.id,
      userEmail: user.email || dto.email, 
      success: true,
      data: {
        isUserVerified,
        isCompleteProfile,
      },
      message: 'Registration completed successfully',
     
    };
  }
  async OTPVerify(dto: AuthOtpVerifyDto): Promise<OtpVerifyResponseDto> {
    const user = await this.usersService.findById(dto.userId);
    if (!user) {
      throw new UnprocessableEntityException({
        success: false,
        message: 'User not found',
        errors: {
          userId: 'userNotFound',
        },
      });
    }

    const validOtp = '123456';
    if (dto.otpCode !== validOtp) {
      throw new UnprocessableEntityException({
        success: false,
        message: 'Invalid OTP',
        errors: {
          otpCode: 'invalidOtp',
        },
      });
    }

    await this.usersService.updateEmailVerified(user.id, true);
    const updatedUser = await this.usersService.findById(user.id);

    if (!updatedUser) {
      throw new UnprocessableEntityException({
        success: false,
        message: 'User not found',
       
      });
    }

    const isCompleteProfile = !!(
      updatedUser.firstName &&
      updatedUser.lastName &&
      updatedUser.fullName &&
      updatedUser.phoneNumber &&
      updatedUser.address
    );

    return {
      success: true,
      message: 'OTP verified successfully',
      data: {
        isUserVerified: true,
        isCompleteProfile: isCompleteProfile,
      }
    
     
    };
  }

  async resendOtp(dto: AuthResendOtpDto): Promise<ResendOtpResponseDto> {
    const user = await this.usersService.findById(dto.userId);

    if (!user) {
      throw new UnprocessableEntityException({
        success: false,
        message: 'User not found',
        
      });
    }

    if (!user.email) {
      throw new UnprocessableEntityException({
        success: false,
        message: 'Email not found',
     
      });
    }

    // Generate OTP (temporarily hardcoded - will be replaced with SMTP later)
    const otpCode = '123456';
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    const isCompleteProfile = !!(
      user.firstName &&
      user.lastName &&
      user.fullName &&
      user.phoneNumber &&
      user.address
    );

    return {
      success: true,
      message: 'OTP sent successfully to your email',
      data: {
        isUserVerified: user.isEmailVerified || false,
        isCompleteProfile: isCompleteProfile,
      },
   
    };
  }

  async register(dto: AuthRegisterLoginDto): Promise<RegisterResponseDto> {
    const existingUser = await this.usersService.findByEmail(dto.email);
    console.log(existingUser, 'existingUser');
    if (!existingUser) {
      throw new UnprocessableEntityException({
        success: false,
        message: 'User not found or email not verified',
      
      });
    }
  
  

    // Update existing user with complete profile data
    const updatedUser = await this.usersService.update(existingUser?.id, {
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
    });

    if (!updatedUser) {
      throw new UnprocessableEntityException({
        success: false,
        message: 'Registration failed',
       
      });
    }

 

    const isCompleteProfile = !!(
      updatedUser.firstName &&
      updatedUser.lastName &&
      updatedUser.fullName &&
      updatedUser.phoneNumber &&
      updatedUser.address
    );

    const isUserVerified = updatedUser.isEmailVerified || false;

    return {
      success: true,
      data: {
        isUserVerified: isUserVerified,
        isCompleteProfile: isCompleteProfile,
      },
      message: 'Registration completed successfully',
    };
  }

  async confirmEmail(hash: string): Promise<void> {
    let userId: User['id'];

    try {
      const jwtData = await this.jwtService.verifyAsync<{
        confirmEmailUserId: User['id'];
      }>(hash, {
        secret: this.configService.getOrThrow('auth.confirmEmailSecret', {
          infer: true,
        }),
      });

      userId = jwtData.confirmEmailUserId;
    } catch {
      throw new UnprocessableEntityException({
        success: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          hash: `invalidHash`,
        },
      });
    }

    const user = await this.usersService.findById(userId);

    if (
      !user ||
      user?.status?.id?.toString() !== StatusEnum.inactive.toString()
    ) {
      throw new NotFoundException({
        success: HttpStatus.NOT_FOUND,
        error: `notFound`,
      });
    }

    user.status = {
      id: StatusEnum.active,
    };

    await this.usersService.update(user.id, user);
  }

  async confirmNewEmail(hash: string): Promise<void> {
    let userId: User['id'];
    let newEmail: User['email'];

    try {
      const jwtData = await this.jwtService.verifyAsync<{
        confirmEmailUserId: User['id'];
        newEmail: User['email'];
      }>(hash, {
        secret: this.configService.getOrThrow('auth.confirmEmailSecret', {
          infer: true,
        }),
      });

      userId = jwtData.confirmEmailUserId;
      newEmail = jwtData.newEmail;
    } catch {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          hash: `invalidHash`,
        },
      });
    }

    const user = await this.usersService.findById(userId);

    if (!user) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: `notFound`,
      });
    }

    user.email = newEmail;
    user.status = {
      id: StatusEnum.active,
    };

    await this.usersService.update(user.id, user);
  }

  async forgotPassword(email: string): Promise<ForgotPasswordResponseDto> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return {
        success: true,
        message: 'If the email exists, a password reset link has been sents',
      };
    }

    const tokenExpiresIn = this.configService.getOrThrow('auth.forgotExpires', {
      infer: true,
    });

    const tokenExpires = Date.now() + ms(tokenExpiresIn);

    const hash = await this.jwtService.signAsync(
      {
        forgotUserId: user.id,
      },
      {
        secret: this.configService.getOrThrow('auth.forgotSecret', {
          infer: true,
        }),
        expiresIn: tokenExpiresIn,
      },
    );

    // Only send email if user exists, but don't reveal this to the client
    try {
      await this.mailService.forgotPassword({
        to: email,
        data: {
          hash,
          tokenExpires,
        },
      });

      return {
        success: true,
        message: 'If the email exists, a password reset link has been sent',
      };
    } catch (error) {
     
      console.error('Failed to send forgot password email:', error);
     
      return {
        success: true,
        message: 'If the email exists, a password reset link has been sent',
      };
    }
  }

  async resetPassword(hash: string, password: string): Promise<ResetPasswordResponseDto> {
    let userId: User['id'];

    // Extract JWT token from hash (remove &expires=... part if present)
    let token = hash;
    if (hash.includes('&expires=')) {
      token = hash.split('&expires=')[0];
    }

    // Optionally validate expires timestamp if present
    if (hash.includes('&expires=')) {
      const expiresMatch = hash.match(/&expires=(\d+)/);
      if (expiresMatch) {
        const expiresTimestamp = parseInt(expiresMatch[1], 10);
        const currentTime = Date.now();
        if (currentTime > expiresTimestamp) {
          throw new UnprocessableEntityException({
            success: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: {
              hash: 'expiredHash',
            },
          });
        }
      }
    }

    try {
      const jwtData = await this.jwtService.verifyAsync<{
        forgotUserId: User['id'];
      }>(token, {
        secret: this.configService.getOrThrow('auth.forgotSecret', {
          infer: true,
        }),
      });

      userId = jwtData.forgotUserId;
    } catch {
      throw new UnprocessableEntityException({
        success: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          hash: 'invalidHash',
        },
      });
    }

    const user = await this.usersService.findById(userId);

    if (!user) {
      throw new UnprocessableEntityException({
        success: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          hash: 'notFound',
        },
      });
    }

    user.password = password;

    await this.sessionService.deleteByUserId({
      userId: user.id,
    });

    await this.usersService.update(user.id, user);

    return {
      success: true,
      message: 'Password reset successfullys',
    
    };
  }

  async me(userJwtPayload: JwtPayloadType): Promise<NullableType<User>> {
    return this.usersService.findById(userJwtPayload.id);
  }

  async update(
    userJwtPayload: JwtPayloadType,
    userDto: AuthUpdateDto,
  ): Promise<NullableType<User>> {
    const currentUser = await this.usersService.findById(userJwtPayload.id);

    if (!currentUser) {
      throw new UnprocessableEntityException({
        success: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          user: 'userNotFound',
        },
      });
    }

    if (userDto.password) {
      if (!userDto.oldPassword) {
        throw new UnprocessableEntityException({
          success: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            oldPassword: 'missingOldPassword',
          },
        });
      }

      if (!currentUser.password) {
        throw new UnprocessableEntityException({
          success: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            oldPassword: 'incorrectOldPassword',
          },
        });
      }

      const isValidOldPassword = await bcrypt.compare(
        userDto.oldPassword,
        currentUser.password,
      );

      if (!isValidOldPassword) {
        throw new UnprocessableEntityException({
          success: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            oldPassword: 'incorrectOldPassword',
          },
        });
      } else {
        await this.sessionService.deleteByUserIdWithExclude({
          userId: currentUser.id,
          excludeSessionId: userJwtPayload.sessionId,
        });
      }
    }

    if (userDto.email && userDto.email !== currentUser.email) {
      const userByEmail = await this.usersService.findByEmail(userDto.email);

      if (userByEmail && userByEmail.id !== currentUser.id) {
        throw new UnprocessableEntityException({
          success: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            email: 'emailExists',
          },
        });
      }

      const hash = await this.jwtService.signAsync(
        {
          confirmEmailUserId: currentUser.id,
          newEmail: userDto.email,
        },
        {
          secret: this.configService.getOrThrow('auth.confirmEmailSecret', {
            infer: true,
          }),
          expiresIn: this.configService.getOrThrow('auth.confirmEmailExpires', {
            infer: true,
          }),
        },
      );

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

  async refreshToken(
    data: Pick<JwtRefreshPayloadType, 'sessionId' | 'hash'>,
  ): Promise<Omit<LoginResponseDto, 'user'>> {
    const session = await this.sessionService.findById(data.sessionId);

    if (!session) {
      throw new UnauthorizedException();
    }

    if (session.hash !== data.hash) {
      throw new UnauthorizedException();
    }

    const hash = crypto
      .createHash('sha256')
      .update(randomStringGenerator())
      .digest('hex');

    const user = await this.usersService.findById(session.user.id);

    if (!user?.role) {
      throw new UnauthorizedException();
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

  async softDelete(user: User): Promise<void> {
    await this.usersService.remove(user.id);
  }

  async logout(data: Pick<JwtRefreshPayloadType, 'sessionId'>) {
    return this.sessionService.deleteById(data.sessionId);
  }

  async verifySocketToken(token: string): Promise<JwtPayloadType> {
    if (!token) {
      throw new UnauthorizedException('Token is required');
    }

    try {
      const payload = await this.jwtService.verifyAsync<JwtPayloadType>(
        token,
        {
          secret: this.configService.getOrThrow('auth.secret', { infer: true }),
        },
      );

      return payload;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private async getTokensData(data: {
    id: User['id'];
    role: User['role'];
    sessionId: Session['id'];
    hash: Session['hash'];
  }) {
    const tokenExpiresIn = this.configService.getOrThrow('auth.expires', {
      infer: true,
    });

    const tokenExpires = Date.now() + ms(tokenExpiresIn);

    const [token, refreshToken] = await Promise.all([
      await this.jwtService.signAsync(
        {
          id: data.id,
          role: data.role,
          sessionId: data.sessionId,
        },
        {
          secret: this.configService.getOrThrow('auth.secret', { infer: true }),
          expiresIn: tokenExpiresIn,
        },
      ),
      await this.jwtService.signAsync(
        {
          sessionId: data.sessionId,
          hash: data.hash,
        },
        {
          secret: this.configService.getOrThrow('auth.refreshSecret', {
            infer: true,
          }),
          expiresIn: this.configService.getOrThrow('auth.refreshExpires', {
            infer: true,
          }),
        },
      ),
    ]);

    return {
      token,
      refreshToken,
      tokenExpires,
    };
  }

  
}
