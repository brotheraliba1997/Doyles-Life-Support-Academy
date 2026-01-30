import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/domain/user';

export class OtpVerifyResponseDto {
  @ApiProperty({ type: User })
  user: User;

  @ApiProperty({ example: true, description: 'User verification status' })
  isUserVerified: boolean;

  @ApiProperty({ example: false, description: 'Profile completion status' })
  isCompleteProfile: boolean;
}
