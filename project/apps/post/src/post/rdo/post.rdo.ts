import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { PostStatus } from '@project/shared/app/types';

export class PostRdo {
  @ApiProperty({})
  @Expose()
  id!: string;

  @ApiProperty({})
  @Expose()
  title!: string;

  @ApiProperty({})
  @Expose()
  content!: string;

  @ApiProperty({})
  @Expose()
  authorId!: string;

  @ApiProperty({ type: [String] })
  @Expose()
  tags!: string[];

  @ApiProperty({ enum: PostStatus })
  @Expose()
  status!: PostStatus;

  @ApiProperty({})
  @Expose()
  createdAt!: Date;

  @ApiProperty({})
  @Expose()
  updatedAt!: Date;
}
