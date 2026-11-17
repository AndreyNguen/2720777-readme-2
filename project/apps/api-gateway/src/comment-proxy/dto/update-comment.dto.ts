import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength, MaxLength } from 'class-validator';

export class UpdateCommentGatewayDto {
  @ApiPropertyOptional({})
  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(300)
  content?: string;
}
