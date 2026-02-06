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
import { LoginResponseDto, LoginResponseSuccessDto } from './dto/login-response.dto';
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
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { OtpSchemaClass, OtpType } from '../users/schema/otp.schema';
import { UserOtpSchemaClass, UserOtpType } from '../users/schema/isuerOtp.schema';
import { AuthRegisterStep1Dto } from './dto/auth-register-step1.dto';
import { AuthOtpVerifyDto } from './dto/auth-otp-verify.dto';
import { AuthResendOtpDto } from './dto/auth-resend-otp.dto';
import { ResendOtpResponseDto } from './dto/resend-otp-response.dto';
import { OtpVerifyResponseDto } from './dto/otp-verify-response.dto';
import { RegisterStep1ResponseDto } from './dto/register-step1-response.dto';
import { RegisterResponseDto } from './dto/register-response.dto';
import { ForgotPasswordResponseDto } from './dto/forgot-password-response.dto';
import { ResetPasswordResponseDto } from './dto/reset-password-response.dto';
import { AuthForgotPasswordOtpVerifyDto } from './dto/auth-forgot-password-otp-verify.dto';
import { ForgotPasswordOtpVerifyResponseDto } from './dto/forgot-password-otp-verify-response.dto';
import { admin } from '../firebase/firebase-admin';
import { DecodedFirebaseTokenDto } from './dto/decodedToken.dto';
import { AuthForgotPasswordDto } from './dto/auth-forgot-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private sessionService: SessionService,
    private mailService: MailService,
    private configService: ConfigService<AllConfigType>,
    @InjectModel(OtpSchemaClass.name)
    private readonly otpModel: Model<OtpSchemaClass>,
    @InjectModel(UserOtpSchemaClass.name)
    private readonly userOtpModel: Model<UserOtpSchemaClass>,
  
  ) {}

  async validateLogin(loginDto: AuthEmailLoginDto): Promise<LoginResponseSuccessDto> {
    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnprocessableEntityException({
        success: false,
        message: 'User not found',
      });
    }

    if (user.provider !== AuthProvidersEnum.email) {
      throw new UnprocessableEntityException({
        success: false,
        message: `needLoginViaProvider:${user.provider}`,
      });
    }

    if (!user.password) {
      throw new UnprocessableEntityException({
        success: false,
        message: 'Incorrect password',
      });
    }

    const isValidPassword = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new UnprocessableEntityException({
        success: false,
        message: 'Incorrect password',
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

    const userOtp = await this.userOtpModel.findOne({
      userId: new Types.ObjectId(user.id as string),
      type: UserOtpType.EMAIL_VERIFICATION,
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
      isCompanyVerified: (user as any).isCompanyVerified || false,
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

  async validateSocialLogin(
     authProvider: string,
     socialData: SocialInterface): Promise<LoginResponseSuccessDto> {
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
        success: false, 
        message: 'User not found',
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



  async registerCreateUser(dto: AuthRegisterStep1Dto): Promise<RegisterStep1ResponseDto> {
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
      isUserVerified: false,
      isCompanyVerified: false,
    });
    
    await this.userOtpModel.create({
      userId: new Types.ObjectId(user.id as string),
      code: "123456",
      email: user.email,
      type: UserOtpType.REGISTER,
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

  
  async OTPVerify(dto: AuthOtpVerifyDto): Promise<OtpVerifyResponseDto> {
    // Validate MongoDB ObjectId format
    if (typeof dto.userId === 'string' && !Types.ObjectId.isValid(dto.userId)) {
      throw new UnprocessableEntityException({
        success: false,
        message: 'Your id is not valid',
      });
    }

    const userFindOutById = await this.usersService.findById(dto.userId);

    if (!userFindOutById) {
      throw new UnprocessableEntityException({
        success: false,
        message: 'User not found',
      });
    }

    // Map DTO type to UserOtpType
    const otpType = dto.type === 'register' ? UserOtpType.REGISTER : 
                    dto.type === 'forgot' ? UserOtpType.FORGOT_PASSWORD : 
                    UserOtpType.EMAIL_VERIFICATION;

    // Find and update OTP atomically to prevent race conditions
    const userOtp = await this.userOtpModel.findOneAndUpdate(
      {
        userId: new Types.ObjectId(userFindOutById.id as string),
        code: dto.otpCode,
        type: otpType,
        isUsed: false,
        expiresAt: { $gt: new Date() }, 
      },
      {
        $set: {
          isUsed: true,
          usedAt: new Date(),
        },
      },
      { new: true }
    );

    if (!userOtp) {
      throw new UnprocessableEntityException({
        success: false,
        message: 'Invalid or expired OTP',
      });
    }

    await this.usersService.updateEmailVerified(userFindOutById.id, true);

    // Update user verification status
    const updatedUser = await this.usersService.update(userFindOutById.id, {
      isUserVerified: true,
    });

    if(!updatedUser) {
      throw new UnprocessableEntityException({
        success: false,
        message: 'User not found',
      });
    }

    


    const userResponse = {
      id: updatedUser.id,
      email: updatedUser.email,
      isUserVerified: updatedUser.isUserVerified,
      isCompanyVerified: (updatedUser as any).isCompanyVerified || false,
    }

    const hash = crypto
      .createHash('sha256')
      .update(randomStringGenerator())
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

  async resendOtp(dto: AuthResendOtpDto): Promise<ResendOtpResponseDto> {
    if (typeof dto.userId === 'string' && !Types.ObjectId.isValid(dto.userId)) {
      throw new UnprocessableEntityException({
        success: false,
        message: 'Your id is not valid',
      });
    }

    const user = await this.usersService.findById(dto.userId);

    if (!user) {
      throw new UnprocessableEntityException({
        success: false,
        message: 'User not found',
        
      });
    }

 

    
    const otpCode = '123456';
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); 

    await this.userOtpModel.findOneAndUpdate(
      {
        type: UserOtpType.REGISTER,
        isUsed: false,
        expiresAt: { $gt: new Date() },
        $or: [
          { userId: new Types.ObjectId(user.id as string) },
          { email: user.email }
        ]
      },
      {
        $set: {
          code: otpCode,
          expiresAt: otpExpiresAt,
          userId: new Types.ObjectId(user.id as string),
          email: user.email,
        }
      },
      { new: true, upsert: true }
    );

   

    const userResponse = {
      id: user.id,
      isUserVerified: user.isUserVerified || false,
      isCompanyVerified: (user as any).isCompanyVerified || false,
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

  async register(
    dto: AuthRegisterLoginDto,
    jwtPayload?: JwtPayloadType,
  ): Promise<RegisterResponseDto> {
    const existingUser = await this.usersService.findByEmail(dto.email);
  


    if (!existingUser) {
      throw new UnprocessableEntityException({
        success: false,
        message: 'User not found ',
      
      });
    }
  

    const updatedUser = await this.usersService.update(existingUser?.id, {
      email: existingUser.email,
      password: existingUser.password,
      firstName: dto.firstName ,
      lastName:  dto.lastName,  
      fullName:  dto.fullName,
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
      throw new UnprocessableEntityException({
        success: false,
        message: 'Registration failed',
       
      });
    }

    let token: string;
    let refreshToken: string;
    let tokenExpires: number;

    if (jwtPayload?.sessionId) {
      const existingSession = await this.sessionService.findById(jwtPayload.sessionId);

      if(!existingSession) {
        throw new UnprocessableEntityException({
          success: false,
          message: 'Session not found',
          
        });
      }


      if (existingSession && existingSession.user?.id === updatedUser.id) {
        const hash = crypto.createHash('sha256').update(randomStringGenerator()).digest('hex');
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
      } else {
        const hash = crypto .createHash('sha256').update(randomStringGenerator()).digest('hex');
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
    } else {
      const hash = crypto.createHash('sha256').update(randomStringGenerator()).digest('hex');
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

 

  async forgotPassword(dto: AuthForgotPasswordDto): Promise<any> {
    if (dto.userId !== undefined && dto.userId !== null) {
      if (typeof dto.userId === 'string' && !Types.ObjectId.isValid(dto.userId)) {
        throw new UnprocessableEntityException({
          success: false,
          message: 'Your id is not valid',
        });
      }
    }

    
    if (dto.email !== undefined && dto.email !== null && dto.email === '') {
      throw new UnprocessableEntityException({
        success: false,
        message: 'Your email is not valid',
      });
    }

    const user = dto.userId ? await this.usersService.findById(dto.userId) : await this.usersService.findByEmail(dto?.email);


    if (!user) {
      throw new UnprocessableEntityException({
        success: false,
        message: 'User not found',
      });
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
    try {
      const otpCode = '123456';
      const otpExpiresAt = new Date(tokenExpires);

      // Save OTP to database
      await this.otpModel.create({
        code: otpCode,
        email: user?.email,
        userId: user.id,
        type: OtpType.FORGOT_PASSWORD,
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
        data : {
          id: user?.id,
          email: user?.email,
      
        },
      };
    } catch (error) {
      throw new UnprocessableEntityException({
        success: false,
        message: 'Failed to send forgot password email',
      });
    
    }
  }

  async verifyForgotPasswordOtp(
    dto: AuthForgotPasswordOtpVerifyDto,
  ): Promise<ForgotPasswordOtpVerifyResponseDto> {

    if (dto.userId !== undefined && dto.userId !== null) {
      if (typeof dto.userId === 'string' && !Types.ObjectId.isValid(dto.userId)) {
        throw new UnprocessableEntityException({
          success: false,
          message: 'Your id is not valid',
        });
      }
    }

    // Validate email if provided
    if (dto.email !== undefined && dto.email !== null && dto.email === '') {
      throw new UnprocessableEntityException({
        success: false,
        message: 'Your email is not valid',
      });
    }

    const user = dto.userId ? await this.usersService.findById(dto.userId) : await this.usersService.findByEmail(dto?.email);

    if (!user) {
      throw new UnprocessableEntityException({
        success: false,
        message: 'User not found',
      });
    }

    const otpRecord = await this.otpModel
      .findOne({
        email: user?.email,
        userId: user?.id,
        code: dto.otpCode,
        type: OtpType.FORGOT_PASSWORD,
        isUsed: false,
      })
      .sort({ createdAt: -1 })
      .exec();

     

    

    if (!otpRecord) {
      throw new UnprocessableEntityException({
        success: false,
        message: 'Invalid or expired OTP',
       
      });
    }

    if (new Date() > otpRecord.expiresAt) {
      throw new UnprocessableEntityException({
        success: false,
        message: 'OTP has expired',
        
      });
    }

    // Mark OTP as used
    otpRecord.isUsed = true;
    otpRecord.usedAt = new Date();
    await otpRecord.save();


    const tokenExpiresIn = this.configService.getOrThrow('auth.forgotExpires', {
      infer: true,
    });

    

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

    return {
      success: true,
      message: 'OTP verified successfully. You can now reset your password.',
      data: {
        resetToken: hash,
      
      },
    };
  }


  async forgotPasswordReset(dto: AuthForgotPasswordDto): Promise<any> {
    if (dto.userId !== undefined && dto.userId !== null) {
      if (typeof dto.userId === 'string' && !Types.ObjectId.isValid(dto.userId)) {
        throw new UnprocessableEntityException({
          success: false,
          message: 'Your id is not valid',
        });
      }
    }

    
    if (dto.email !== undefined && dto.email !== null && dto.email === '') {
      throw new UnprocessableEntityException({
        success: false,
        message: 'Your email is not valid',
      });
    }

    const user = dto.userId ? await this.usersService.findById(dto.userId) : await this.usersService.findByEmail(dto?.email);


    if (!user) {
      throw new UnprocessableEntityException({
        success: false,
        message: 'User not found',
      });
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


    
    try {
      const otpCode = '123456'; // demo
      const otpExpiresAt = new Date(tokenExpires);
    
      await this.otpModel.findOneAndUpdate(
        {
          type: OtpType.FORGOT_PASSWORD,
          isUsed: false,
          expiresAt: { $gt: new Date() },
          $or: [
            { userId: user?.id },
            { email: user?.email }
          ]
        },
        {
          $set: {
            code: otpCode,
            expiresAt: otpExpiresAt,
            userId: user.id,
            email: user.email,
            resendCount: 0
          }
        },
        { new: true , upsert: true }
        
      );
    
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
    } catch (error) {
      throw new UnprocessableEntityException({
        success: false,
        message: 'Failed to send forgot password reset email',
      });
    }
    
  }

  async resetPassword(
    resetToken: string,
    password: string,
  ): Promise<ResetPasswordResponseDto> {
    let userId: User['id'];

    try {
      const jwtData = await this.jwtService.verifyAsync<{
        forgotUserId: User['id'];
      }>(resetToken, {
        secret: this.configService.getOrThrow('auth.forgotSecret', {
          infer: true,
        }),
      });

      userId = jwtData.forgotUserId;
    } catch {
      throw new UnprocessableEntityException({
        success: false,
        message: 'Invalid reset password token',
       
      });
    }

    const user = await this.usersService.findById(userId);

    if (!user) {
      throw new UnprocessableEntityException({
        success: false,
        message: 'User not found',
       
      });
    }

    // Delete all user sessions to force re-login
    await this.sessionService.deleteByUserId({ userId: user.id });
    
    // Update password - usersService.update will hash it automatically
    // Pass plain password, service will compare and hash if different
    await this.usersService.update(user.id, {
      password: password,
    });

    return {
      success: true,
      message: 'Password reset successfully',
    };
  }


  async firebaseLogin(firebaseToken: string, provider: string) {
    let decodedToken: any;
    let user: any
    try {
      decodedToken = this.jwtService.decode(firebaseToken);

  
       

      console.log("decodedToken", decodedToken);
      if (!decodedToken) {
        throw new UnprocessableEntityException({
          success: false,
          message: 'Invalid Firebase token',
        });
      }
      
      // console.log("decodedToken", decodedToken);
    } catch (error) {
      throw new UnprocessableEntityException({
        success: false,
        message: 'Invalid Firebase token',
      });
    }
  
    // Extract data from decoded Firebase token
    const uid = decodedToken.uid || decodedToken.sub || decodedToken.user_id;
    const email = decodedToken.email;
    const name = decodedToken.name;
  

    if (!uid) {
      throw new UnprocessableEntityException({
        success: false,
        message: 'User ID not found in Firebase token',
      });
    }

    if (!email) {
      throw new UnprocessableEntityException({
        success: false,
        message: 'Email not found in Firebase token',
      });
    }

    // Pehle email se check karo - agar user already database mein hai toh wohi use karo
    user = await this.usersService.findByEmail(email);

    // Email se nahi mila toh Firebase UID se dhoondo
    if (!user) {
      user = await this.usersService.findByFirebaseUid(uid);
    }

    // Dono se nahi mila toh naya user create karo
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
          id: RoleEnum.student,
        },
        status: {
          id: StatusEnum.inactive,
        },
        isUserVerified: true,
        isCompanyVerified: false,
        lat: lat,
        long: long,
      });
    }

    // Ab jo bhi user hai (already exist ya naya) usi ke liye session + token
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
      success: true,
      message: 'Login successful',
      data: {
        id: user.id,
        email: user.email,
        token,
        refreshToken,
        tokenExpires,
        isUserVerified: user.isUserVerified,
        isCompanyVerified: (user as any).isCompanyVerified || false,
      },
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
        success: false, 
        message: 'User not found',
      });
    }

    if (userDto.password) {
      if (!userDto.oldPassword) {
        throw new UnprocessableEntityException({
          success: false, 
          message: 'Missing old password',
        });
      }

      if (!currentUser.password) {
        throw new UnprocessableEntityException({
          success: false, 
          message: 'Incorrect old password',
        });
      }

      const isValidOldPassword = await bcrypt.compare(
        userDto.oldPassword,
        currentUser.password,
      );

      if (!isValidOldPassword) {
        throw new UnprocessableEntityException({
          success:    false,
          
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
          success: false, 
          message: 'Email already exists',
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
