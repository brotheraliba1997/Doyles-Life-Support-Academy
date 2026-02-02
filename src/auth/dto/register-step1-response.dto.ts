import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';


export class RegisterStep1ResponseDataDto {
  @ApiProperty({ example: false, description: 'User verification status' })

  isUserVerified: boolean;

  @ApiProperty({ example: false, description: 'Profile completion status' })
  
  isCompleteProfile: boolean;


  @ApiProperty({ example: '507f1f77bcf86cd799439011' })
  id: string | number;

  @ApiProperty({ example: 'test@example.com' })
  email: string;

}

export class RegisterStep1ResponseDto {
 

  @ApiProperty({ example: 201, description: 'Indicates whether the operation succeeded' })
  success: number | boolean;

  @ApiProperty({ example: 'Registration completed successfully', description: 'Human-readable response message' })
  message: string;  


  @ApiProperty({ type: RegisterStep1ResponseDataDto })
  @IsOptional()
  @Type(() => RegisterStep1ResponseDataDto)
  data: RegisterStep1ResponseDataDto;
}
