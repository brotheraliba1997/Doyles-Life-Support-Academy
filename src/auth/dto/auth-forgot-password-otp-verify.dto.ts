import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class AuthForgotPasswordOtpVerifyDto {
  @ApiProperty({ example: 'user@example.com', description: 'User email address' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '1234', description: 'OTP code received via email' })
  @IsNotEmpty()
  @IsString()
  otpCode: string;
}
