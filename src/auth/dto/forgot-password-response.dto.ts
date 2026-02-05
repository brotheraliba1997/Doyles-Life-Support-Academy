import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordResponseDataDto {
  @ApiProperty({ example: '507f1f77bcf86cd799439011', description: 'User ID' })
  id: string | number;
}

export class ForgotPasswordResponseDto {
  @ApiProperty({ example: true, description: 'Indicates whether the operation succeeded' })
  success: boolean;

  @ApiProperty({ example: 'If the email exists, a password reset OTP has been sent', description: 'Human-readable response message' })
  message: string;

  @ApiProperty({ type: ForgotPasswordResponseDataDto })
  data: ForgotPasswordResponseDataDto;
}
