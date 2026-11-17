import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RegisterGatewayDto {
  @ApiProperty({})
  @IsString()
  email!: string;

  @ApiProperty({})
  @IsString()
  name!: string;

  @ApiProperty({})
  @IsString()
  password!: string;
}
