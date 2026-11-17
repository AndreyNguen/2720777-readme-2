import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsInt, Min, Max, IsString } from 'class-validator';

export class QueryPostGatewayDto {
  @ApiPropertyOptional({})
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  limit = 25;

  @ApiPropertyOptional({})
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  offset = 0;

  @ApiPropertyOptional({})
  @IsOptional()
  @IsString()
  authorId?: string;

  @ApiPropertyOptional({})
  @IsOptional()
  @IsString()
  search?: string;
}
