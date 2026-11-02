import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CommentRdo {
  @ApiProperty({})
  @Expose()
  id!: string;

  @ApiProperty({})
  @Expose()
  postId!: string;

  @ApiProperty({})
  @Expose()
  authorId!: string;

  @ApiProperty({})
  @Expose()
  content!: string;

  @ApiProperty({})
  @Expose()
  createdAt!: Date;

  @ApiProperty({})
  @Expose()
  updatedAt!: Date;
}
