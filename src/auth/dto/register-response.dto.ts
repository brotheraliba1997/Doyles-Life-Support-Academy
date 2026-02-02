import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/domain/user';

class RegisterDataDto {
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
