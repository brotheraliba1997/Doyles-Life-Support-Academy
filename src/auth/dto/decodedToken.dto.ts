import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class FirebaseInfoDto {
  @ApiProperty({ example: 'google.com' })
  sign_in_provider: string;
}

export class DecodedFirebaseTokenDto {
  @ApiProperty({ example: 'kZx1y2...' })
  uid: string;

  @ApiPropertyOptional({ example: 'John Doe' })
  name?: string;

  @ApiPropertyOptional({ example: 'user@example.com' })
  email?: string;  // <-- yahan `?` laga do

  @ApiProperty({ type: FirebaseInfoDto })
  firebase: FirebaseInfoDto;
}