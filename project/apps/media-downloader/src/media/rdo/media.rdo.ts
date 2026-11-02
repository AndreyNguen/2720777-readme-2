import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { MediaType } from '@project/shared/app/types';

export class MediaRdo {
  @ApiProperty({})
  @Expose()
  id!: string;

  @ApiProperty({ enum: MediaType })
  @Expose()
  type!: MediaType;

  @ApiProperty({})
  @Expose()
  url!: string;

  @ApiProperty({})
  @Expose()
  filename!: string;

  @ApiProperty({})
  @Expose()
  size!: number;

  @ApiProperty({})
  @Expose()
  createdAt!: Date;
}
