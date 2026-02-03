import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordOtpVerifyResponseDataDto {
  @ApiProperty({ description: 'Reset password token/hash' })
  resetToken: string;


}

export class ForgotPasswordOtpVerifyResponseDto {
  @ApiProperty({ example: true, description: 'Indicates whether the operation succeeded' })
  success: boolean;

  @ApiProperty({ example: 'OTP verified successfully. You can now reset your password.', description: 'Human-readable response message' })
  message: string;

  @ApiProperty({ type: ForgotPasswordOtpVerifyResponseDataDto })
  data: ForgotPasswordOtpVerifyResponseDataDto;
}
