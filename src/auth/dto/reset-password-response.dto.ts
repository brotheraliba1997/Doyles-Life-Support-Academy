import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordResponseDto {
  @ApiProperty({ example: true, description: 'Indicates whether the operation succeeded' })
  success: boolean;

  @ApiProperty({ example: 'Password reset successfully', description: 'Human-readable response message' })
  message: string;
}
