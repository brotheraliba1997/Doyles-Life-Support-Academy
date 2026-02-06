import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, IsOptional } from 'class-validator';

export class AuthForgotPasswordOtpVerifyDto {
  @ApiProperty({ example: 'hamzaali1997.h@gmail.com', description: 'User email address' })
  @IsNotEmpty()
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({ example: '507f1f77bcf86cd799439011', description: 'User ID' })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  userId: string | number;

  @ApiProperty({ example: '123456', description: 'OTP code received via email' })
  @IsNotEmpty()
  @IsString()
  otpCode: string;
}
