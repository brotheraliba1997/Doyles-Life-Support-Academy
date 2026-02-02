import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/domain/user';
import { IsOptional } from 'class-validator';
import { Type } from 'class-transformer';



export class ResendOtpResponseDataDto {
  @ApiProperty({ example: false, description: 'User verification status' })
  isUserVerified: boolean;

  @ApiProperty({ example: false, description: 'Profile completion status' })
  isCompleteProfile: boolean;
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
