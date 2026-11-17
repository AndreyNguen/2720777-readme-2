import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
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

  @ApiProperty({ description: 'Количество лайков', example: 0 })
  @Expose()
  @Transform(({ obj }) => obj._count?.likes ?? 0)
  likesCount!: number;

  @ApiProperty({ description: 'Количество комментов', example: 0 })
  @Expose()
  @Transform(({ obj }) => obj._count?.comments ?? 0)
  commentsCount!: number;

  @ApiProperty({})
  @Expose()
  createdAt!: Date;

  @ApiProperty({})
  @Expose()
  updatedAt!: Date;
}
