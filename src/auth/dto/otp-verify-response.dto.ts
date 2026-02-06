import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class OtpVerifyUserResponseDto {
  @ApiProperty({ description: 'User ID' })
  id: number | string;

  @ApiProperty({ example: true, description: 'User verified status' })
  isUserVerified: boolean;

  @ApiProperty({ example: true, description: 'Company verified status' })
  isCompanyVerified: boolean;
}

export class OtpVerifyResponseDataDto {
  @ApiProperty({ description: 'JWT access token' })
  token: string;

  @ApiProperty({ description: 'JWT refresh token' })
  refreshToken: string;

  @ApiProperty({ description: 'Token expiry timestamp (ms)' })
  tokenExpires: number;

  @ApiProperty({ description: 'OTP code (for debugging)' })
  otp: string;

  @ApiProperty({ type: OtpVerifyUserResponseDto, description: 'User information' })
  user: OtpVerifyUserResponseDto;
}

export class OtpVerifyResponseDto {
  @ApiProperty({ example: true, description: 'Indicates whether the operation succeeded' })
  success: boolean;

  @ApiProperty({ example: 'OTP verified successfully', description: 'Human-readable response message' })
  message: string;

  @ApiProperty({ type: OtpVerifyResponseDataDto })
  @IsOptional()
  @Type(() => OtpVerifyResponseDataDto)
  data: OtpVerifyResponseDataDto;
}
