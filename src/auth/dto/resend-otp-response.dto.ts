import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class ResendOtpUserResponseDto {
  @ApiProperty({ description: 'User ID' })
  id: number | string;

  @ApiProperty({ example: true, description: 'User verified status' })
  isUserVerified: boolean;

  @ApiProperty({ example: true, description: 'Company verified status' })
  isCompletedProfileVerified: boolean;
}

export class ResendOtpResponseDataDto {


  @ApiProperty({ example: '123456', description: 'OTP code' })
  otp: string;

  @ApiProperty({ example: '2026-02-06T10:00:00.000Z', description: 'OTP expires at' })
  otpExpiresAt: Date;



  @ApiProperty({ type: ResendOtpUserResponseDto, description: 'User information' })
  user: ResendOtpUserResponseDto;
}

export class ResendOtpResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'OTP sent successfully to your email' })
  message: string;

  
  @ApiProperty({ type: ResendOtpResponseDataDto })
  @IsOptional()
  @Type(() => ResendOtpResponseDataDto)
  data: ResendOtpResponseDataDto;
}
