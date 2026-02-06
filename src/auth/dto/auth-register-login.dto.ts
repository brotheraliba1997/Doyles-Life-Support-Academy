import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength, IsOptional, IsString, IsNumber, IsDateString, IsEnum, IsBoolean } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { lowerCaseTransformer } from '../../utils/transformers/lower-case.transformer';

export class AuthRegisterLoginDto {
  @ApiProperty({ example: 'test1@example.com', type: String })
  @Transform(lowerCaseTransformer)
  @IsEmail()
  email: string;



  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: 'John Doe' })
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty({ example: 'orca-technologies' })
  @IsNotEmpty()
  company: string;

  @ApiProperty({ example: 'web developer' })
  @IsNotEmpty()
  jobTitle: string;

  @ApiProperty({ example: 'hamzaali1997.h@gmail.com' })
  @IsNotEmpty()
  emailAddress: string;

  @ApiProperty({ example: '923001234567', type: Number })
  @IsNotEmpty()
  @IsNumber()
  phoneNumber: number;

  @ApiProperty({ example: '+92' })
  @IsNotEmpty()
  @IsString()
  countryCode: string;

  @ApiProperty({ example: 'PK' })
  @IsNotEmpty()
  @IsString()
  isoCode: string;

  @ApiProperty({ example: '1990-01-01T00:00:00.000Z' })
  @IsNotEmpty()
  @IsDateString()
  dob: string;

  @ApiProperty({ example: 'male', enum: ['male', 'female', 'other'] })
  @IsNotEmpty()
  @IsString()
  gender: string;

  @ApiProperty({ example: '123 Main Street, City, Country' })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({ example: 24.8607, type: Number })
  @IsNotEmpty()
  @IsNumber()
  lat: number;

  @ApiProperty({ example: 67.0011, type: Number })
  @IsNotEmpty()
  @IsNumber()
  long: number;

  @ApiProperty({ example: 'Jane Doe' })
  @IsNotEmpty()
  @IsString()
  emergencyContactName: string;

  @ApiProperty({ example: 'spouse' })
  @IsNotEmpty()
  @IsString()
  emergencyRelation: string;

  @ApiProperty({ example: '+92' })
  @IsNotEmpty()
  @IsString()
  emergencyCountryCode: string;

  @ApiProperty({ example: 'PK' })
  @IsNotEmpty()
  @IsString()
  emergencyIsoCode: string;

  @ApiProperty({ example: '923009876543' })
  @IsNotEmpty()
  @IsString()
  emergencyPhoneNumber: string;

  @ApiProperty({ example: 'United State America' })
  @IsNotEmpty()
  country: string;
  @ApiProperty({ example: 'United State America' })
  @IsNotEmpty()
  industry: string;

  @ApiPropertyOptional({ example: 'fcm_token_abc123xyz', type: String })
  @IsOptional()
  @IsString()
  deviceToken?: string;

  @ApiPropertyOptional({ example: 'android', enum: ['ios', 'android', 'web'], type: String })
  @IsOptional()
  @IsString()
  deviceType?: string;

  @ApiPropertyOptional({ example: 2, description: 'Role ID: 1=admin, 2=student, 3=instructor', type: Number })
  @IsOptional()
  @IsNumber()
  role?: number;


}
