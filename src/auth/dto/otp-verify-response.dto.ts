import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/domain/user';
import { IsOptional } from 'class-validator';
import { Type } from 'class-transformer';


export class RegisterStep1ResponseDataDto {
  @ApiProperty({ example: false, description: 'User verification status' })
  isUserVerified: boolean;

  @ApiProperty({ description: 'JWT access token' })
  token: string;

  @ApiProperty({ description: 'JWT refresh token' })
  refreshToken: string;

  @ApiProperty({ description: 'Token expiry timestamp (ms)' })
  tokenExpires: number;

  @ApiProperty({ example: false, description: 'Profile completion status' })
  isCompleteProfile: boolean;
}

export class OtpVerifyResponseDto {
  @ApiProperty({ example: true, description: 'Indicates whether the operation succeeded' })
  success: boolean;

  @ApiProperty({ example: 'OTP verified successfully', description: 'Human-readable response message' })
  message: string;


  @ApiProperty({ type: RegisterStep1ResponseDataDto })
  @IsOptional()
  @Type(() => RegisterStep1ResponseDataDto)
  data: RegisterStep1ResponseDataDto;
}
