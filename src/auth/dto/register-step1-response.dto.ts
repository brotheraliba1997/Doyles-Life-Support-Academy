import { ApiProperty } from '@nestjs/swagger';

export class RegisterStep1ResponseDto {
  @ApiProperty({ example: '507f1f77bcf86cd799439011' })
  userId: string | number;

  @ApiProperty({ example: 'test@example.com' })
  userEmail: string;

  @ApiProperty({ example: false, description: 'User verification status' })
  isUserVerified: boolean;

  @ApiProperty({ example: false, description: 'Profile completion status' })
  isCompleteProfile: boolean;
}
