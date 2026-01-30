import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class AuthOtpVerifyDto {
  @ApiProperty({ example: '507f1f77bcf86cd799439011', description: 'User ID' })
  @IsNotEmpty()
  userId: string | number;

  @ApiProperty({ example: '123456', description: 'OTP code' })
  @IsNotEmpty()
  @IsString()
  otpCode: string;

  @ApiProperty({ example: 'register', enum: ['register', 'forgot'], description: 'OTP type' })
  @IsNotEmpty()
  @IsString()
  type: 'register' | 'forgot';
}
