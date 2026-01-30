import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/domain/user';

export class ResendOtpResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'OTP sent successfully to your email' })
  message: string;

  @ApiProperty({ type: User })
  user: User;

  @ApiProperty({ example: false, description: 'User verification status' })
  isUserVerified: boolean;

  @ApiProperty({ example: false, description: 'Profile completion status' })
  isCompleteProfile: boolean;
}
