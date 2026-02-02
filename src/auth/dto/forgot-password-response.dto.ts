import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordResponseDto {
  @ApiProperty({ example: true, description: 'Indicates whether the operation succeeded' })
  success: boolean;

  @ApiProperty({ example: 'If the email exists, a password reset link has been sent', description: 'Human-readable response message' })
  message: string;
}
