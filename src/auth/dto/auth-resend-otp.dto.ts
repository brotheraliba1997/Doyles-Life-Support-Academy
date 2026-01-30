import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';

export class AuthResendOtpDto {
  @ApiProperty({ example: '507f1f77bcf86cd799439011', description: 'User ID' })
  @IsNotEmpty()
  userId: string | number;

  @ApiPropertyOptional({ 
    example: 'register', 
    enum: ['register', 'forgot'], 
    description: 'OTP type',
    default: 'register'
  })
  @IsOptional()
  @IsString()
  @IsEnum(['register', 'forgot'])
  type?: 'register' | 'forgot';
}
