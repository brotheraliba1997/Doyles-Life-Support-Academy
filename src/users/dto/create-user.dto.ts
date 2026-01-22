import { Transform, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MinLength,
  IsString,
  IsNumber,
  IsDateString,
} from 'class-validator';
import { FileDto } from '../../files/dto/file.dto';
import { RoleDto } from '../../roles/dto/role.dto';
import { StatusDto } from '../../statuses/dto/status.dto';
import { lowerCaseTransformer } from '../../utils/transformers/lower-case.transformer';

export class CreateUserDto {
  @ApiProperty({ example: 'test1@example.com', type: String })
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  @IsEmail()
  email: string | null;

  @ApiProperty({ example: '123456', type: String })
  @MinLength(6)
  @IsOptional()
  password?: string;

  @ApiPropertyOptional({ example: 'email', type: String })
  @IsOptional()
  @IsString()
  provider?: string;

  @ApiPropertyOptional({ example: 'social-123', type: String })
  @IsOptional()
  @IsString()
  socialId?: string | null;

  @ApiProperty({ example: 'John', type: String })
  @IsNotEmpty()
  @IsString()
  firstName: string | null;

  @ApiProperty({ example: 'Doe', type: String })
  @IsNotEmpty()
  @IsString()
  lastName: string | null;

  @ApiPropertyOptional({ example: 'John Doe', type: String })
  @IsOptional()
  @IsString()
  fullName?: string | null;

  @ApiPropertyOptional({ type: () => FileDto })
  @IsOptional()
  photo?: FileDto | null;

  @ApiPropertyOptional({ type: () => RoleDto })
  @IsOptional()
  @Type(() => RoleDto)
  role?: RoleDto | null;

  @ApiPropertyOptional({ type: () => StatusDto })
  @IsOptional()
  @Type(() => StatusDto)
  status?: StatusDto | null;

  // ✅ Additional fields from your schema

  @ApiProperty({ example: 'Orca Technologies', type: String })
  @IsNotEmpty()
  @IsString()
  company: string;

  @ApiProperty({ example: 'Web Developer', type: String })
  @IsNotEmpty()
  @IsString()
  jobTitle: string;

  @ApiProperty({ example: 'hamzaali1997.h@gmail.com', type: String })
  @IsNotEmpty()
  @IsEmail()
  emailAddress: string;

  @ApiProperty({ example: '923001234567', type: Number })
  @IsNotEmpty()
  @IsNumber()
  phoneNumber: number;

  @ApiPropertyOptional({ example: '+92', type: String })
  @IsOptional()
  @IsString()
  countryCode?: string;

  @ApiPropertyOptional({ example: 'PK', type: String })
  @IsOptional()
  @IsString()
  isoCode?: string;

  @ApiPropertyOptional({ example: '1990-01-01T00:00:00.000Z', type: String })
  @IsOptional()
  dob?: string | Date;

  @ApiPropertyOptional({ example: 'male', type: String, enum: ['male', 'female', 'other'] })
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiPropertyOptional({ example: '123 Main Street, City, Country', type: String })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ example: 24.8607, type: Number })
  @IsOptional()
  @IsNumber()
  lat?: number;

  @ApiPropertyOptional({ example: 67.0011, type: Number })
  @IsOptional()
  @IsNumber()
  long?: number;

  @ApiPropertyOptional({ example: 'Jane Doe', type: String })
  @IsOptional()
  @IsString()
  emergencyContactName?: string;

  @ApiPropertyOptional({ example: 'spouse', type: String })
  @IsOptional()
  @IsString()
  emergencyRelation?: string;

  @ApiPropertyOptional({ example: '+92', type: String })
  @IsOptional()
  @IsString()
  emergencyCountryCode?: string;

  @ApiPropertyOptional({ example: 'PK', type: String })
  @IsOptional()
  @IsString()
  emergencyIsoCode?: string;

  @ApiPropertyOptional({ example: '923009876543', type: String })
  @IsOptional()
  @IsString()
  emergencyPhoneNumber?: string;

  @ApiProperty({ example: 'United States of America', type: String })
  @IsNotEmpty()
  @IsString()
  country: string;

  @ApiProperty({ example: 'Technology', type: String })
  @IsNotEmpty()
  @IsString()
  industry: string;

  @ApiPropertyOptional({ example: 'USD', type: String })
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiPropertyOptional({ example: 'fcm_token_abc123xyz', type: String })
  @IsOptional()
  @IsString()
  deviceToken?: string;

  @ApiPropertyOptional({ example: 'android', type: String, enum: ['ios', 'android', 'web'] })
  @IsOptional()
  @IsString()
  deviceType?: string;
}
