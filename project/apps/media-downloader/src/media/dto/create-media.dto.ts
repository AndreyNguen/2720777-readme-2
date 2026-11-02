import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';

export class CreateMediaDto {
  @ApiProperty({})
  @IsString()
  @IsUrl({}, { message: 'Некорректный URL' })
  url!: string;
}
