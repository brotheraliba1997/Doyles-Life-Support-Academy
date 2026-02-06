import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Request,
  Post,
  UseGuards,
  Patch,
  Delete,
  SerializeOptions,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthEmailLoginDto } from './dto/auth-email-login.dto';
import { AuthForgotPasswordDto } from './dto/auth-forgot-password.dto';
import { AuthConfirmEmailDto } from './dto/auth-confirm-email.dto';
import { AuthResetPasswordDto } from './dto/auth-reset-password.dto';
import { AuthUpdateDto } from './dto/auth-update.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthRegisterLoginDto } from './dto/auth-register-login.dto';
import { LoginResponseDto, LoginResponseSuccessDto } from './dto/login-response.dto';
import { NullableType } from '../utils/types/nullable.type';
import { User } from '../users/domain/user';
import { RefreshResponseDto } from './dto/refresh-response.dto';
import { AuthRegisterStep1Dto } from './dto/auth-register-step1.dto';
import { RegisterStep1ResponseDto } from './dto/register-step1-response.dto';
import { AuthOtpVerifyDto } from './dto/auth-otp-verify.dto';
import { AuthResendOtpDto } from './dto/auth-resend-otp.dto';
import { ResendOtpResponseDto } from './dto/resend-otp-response.dto';
import { OtpVerifyResponseDto } from './dto/otp-verify-response.dto';
import { RegisterResponseDto } from './dto/register-response.dto';
import { ForgotPasswordResponseDto } from './dto/forgot-password-response.dto';
import { ResetPasswordResponseDto } from './dto/reset-password-response.dto';
import { AuthForgotPasswordOtpVerifyDto } from './dto/auth-forgot-password-otp-verify.dto';
import { ForgotPasswordOtpVerifyResponseDto } from './dto/forgot-password-otp-verify-response.dto';
import { JwtPayloadType } from './strategies/types/jwt-payload.type';
import { FirebaseLoginDto } from './dto/FirebaseLogin.dto';

@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @SerializeOptions({
    groups: ['me'],
  })
  @Post('email/login')
  @ApiOkResponse({ type: LoginResponseSuccessDto })
  @HttpCode(HttpStatus.OK)
  public login(@Body() loginDto: AuthEmailLoginDto): Promise<LoginResponseSuccessDto> {
    return this.service.validateLogin(loginDto);
  }

  @Post('email/register')
  @ApiOkResponse({ type: RegisterStep1ResponseDto })
  @HttpCode(HttpStatus.OK)
  async registerStep1(
    @Body() createUserDto: AuthRegisterStep1Dto,
  ): Promise<RegisterStep1ResponseDto> {
    return this.service.registerCreateUser(createUserDto);
  }


 
  @Post('OTP/verify')
  @ApiOkResponse({ type: OtpVerifyResponseDto })
  @HttpCode(HttpStatus.OK)
  async OTPVerify(
    @Body() otpVerifyDto: AuthOtpVerifyDto,
   
  ): Promise<OtpVerifyResponseDto> {
    return this.service.OTPVerify(otpVerifyDto);
  }

  @Post('OTP/resend')
  @ApiOkResponse({ type: ResendOtpResponseDto })
  @HttpCode(HttpStatus.OK)
  async resendOtp(
    @Body() resendOtpDto: AuthResendOtpDto,
  ): Promise<ResendOtpResponseDto> {
    return this.service.resendOtp(resendOtpDto);
  }

  @Post('/register/complete')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOkResponse({ type: RegisterResponseDto })
  @HttpCode(HttpStatus.OK)
  async register(
    @Body() createUserDto: AuthRegisterLoginDto,
    @Request() req: { user: JwtPayloadType },
  ): Promise<RegisterResponseDto> {
    return this.service.register(createUserDto, req.user);
  }





  

  @Post('forgot/password')
  @ApiOkResponse({ type: ForgotPasswordResponseDto })
  @HttpCode(HttpStatus.OK)
  async forgotPassword(
    @Body() forgotPasswordDto: AuthForgotPasswordDto,
  ): Promise<ForgotPasswordResponseDto> {
    return this.service.forgotPassword(forgotPasswordDto);
  }




  @Post('forgot/password/verify-otp')
  @ApiOkResponse({ type: ForgotPasswordOtpVerifyResponseDto })
  @HttpCode(HttpStatus.OK)
  async verifyForgotPasswordOtp(
    @Body() verifyOtpDto: AuthForgotPasswordOtpVerifyDto,
  ): Promise<ForgotPasswordOtpVerifyResponseDto> {
    return this.service.verifyForgotPasswordOtp(verifyOtpDto);
  }


  @Post('forgot/password/OTP/resend')
  @ApiOkResponse({ type: ForgotPasswordResponseDto })
  @HttpCode(HttpStatus.OK)
  async forgotPasswordReset(
    @Body() forgotPasswordDto: AuthForgotPasswordDto,
  ): Promise<ForgotPasswordResponseDto> {
    return this.service.forgotPasswordReset(forgotPasswordDto);
  }

  @Post('reset/password')
  @ApiOkResponse({ type: ResetPasswordResponseDto })
  @HttpCode(HttpStatus.OK)
  resetPassword(@Body() resetPasswordDto: AuthResetPasswordDto): Promise<ResetPasswordResponseDto> {
    return this.service.resetPassword(
      resetPasswordDto.resetToken,
      resetPasswordDto.password,
    );
  }


  @Post('social/login')
async firebaseLogin(@Body() dto: FirebaseLoginDto) {
  return this.service.firebaseLogin(dto.token);
}



  @ApiBearerAuth()
  @ApiOkResponse({
    type: RefreshResponseDto,
  })
  @SerializeOptions({
    groups: ['me'],
  })
  @Post('refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  @HttpCode(HttpStatus.OK)
  public refresh(@Request() request): Promise<RefreshResponseDto> {
    return this.service.refreshToken({
      sessionId: request.user.sessionId,
      hash: request.user.hash,
    });
  }

  @ApiBearerAuth()
  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  public async logout(@Request() request): Promise<void> {
    await this.service.logout({
      sessionId: request.user.sessionId,
    });
  }

  @ApiBearerAuth()
  @SerializeOptions({
    groups: ['me'],
  })
  @Patch('me')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: User,
  })
  public update(
    @Request() request,
    @Body() userDto: AuthUpdateDto,
  ): Promise<NullableType<User>> {
    return this.service.update(request.user, userDto);
  }

  @ApiBearerAuth()
  @Delete('me')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Request() request): Promise<void> {
    return this.service.softDelete(request.user);
  }
}
