import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/domain/user';

class RegisterDataDto {
  @ApiProperty({ example: 'eyJhbGc...', description: 'JWT access token' })
  token: string;

  @ApiProperty({ example: 'eyJhbGc...', description: 'JWT refresh token' })
  refreshToken: string;

  @ApiProperty({ example: 1734567890000, description: 'Token expiry timestamp' })
  tokenExpires: number;

  @ApiProperty({ example: true, description: 'Whether the user email is verified' })
  isUserVerified: boolean;

  @ApiProperty({ example: true, description: 'Whether the user profile is complete' })
  isCompleteProfile: boolean;

  @ApiProperty({
    type: () => User,
  })
  user: User;
}

export class RegisterResponseDto {
  @ApiProperty({ example: true, description: 'Indicates whether the operation succeeded' })
  success: boolean;

  @ApiProperty({ 
    type: RegisterDataDto,
    description: 'Registration data containing user verification and profile completion status'
  })
  data: RegisterDataDto;

  @ApiProperty({ example: 'Registration completed successfully', description: 'Human-readable response message' })
  message: string;
}
