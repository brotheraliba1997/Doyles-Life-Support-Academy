import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class FirebaseLoginDto {
  @ApiProperty({ example: 'token' })
  @IsNotEmpty()
  @IsString()
  token: string;


  @ApiProperty({ example: 'google| apple' })
  @IsNotEmpty()
  @IsString()
  provider: 'google'  | 'apple';
}