import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentRdo } from './rdo/comment.rdo';

@ApiTags('comments')
@Controller('posts/:postId/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  @ApiOperation({})
  @ApiParam({ name: 'postId' })
  @ApiResponse({ status: 200, type: [CommentRdo] })
  @ApiResponse({ status: 404 })
  async findAll(@Param('postId') postId: string): Promise<CommentRdo[]> {
    const comments = await this.commentService.findByPostId(postId);
    return comments.map((comment) =>
      plainToInstance(CommentRdo, comment, { excludeExtraneousValues: true }),
    );
  }

  @Get(':commentId')
  @ApiOperation({})
  @ApiParam({ name: 'postId' })
  @ApiParam({ name: 'commentId' })
  @ApiResponse({ status: 200, type: CommentRdo })
  @ApiResponse({ status: 404 })
  async findById(
    @Param('postId') postId: string,
    @Param('commentId') commentId: string,
  ): Promise<CommentRdo> {
    const comment = await this.commentService.findById(postId, commentId);
    return plainToInstance(CommentRdo, comment, {
      excludeExtraneousValues: true,
    });
  }

  @Post()
  @ApiOperation({})
  @ApiParam({ name: 'postId' })
  @ApiResponse({ status: 201, type: CommentRdo })
  @ApiResponse({ status: 404 })
  async create(
    @Param('postId') postId: string,
    @Body() dto: CreateCommentDto,
  ): Promise<CommentRdo> {
    const authorId = '00000000-0000-0000-0000-000000000000';
    const comment = await this.commentService.create(postId, dto, authorId);
    return plainToInstance(CommentRdo, comment, {
      excludeExtraneousValues: true,
    });
  }

  @Patch(':commentId')
  @ApiOperation({})
  @ApiParam({ name: 'postId' })
  @ApiParam({ name: 'commentId' })
  @ApiResponse({ status: 200, type: CommentRdo })
  @ApiResponse({ status: 404 })
  async update(
    @Param('postId') postId: string,
    @Param('commentId') commentId: string,
    @Body() dto: UpdateCommentDto,
  ): Promise<CommentRdo> {
    const comment = await this.commentService.update(postId, commentId, dto);
    return plainToInstance(CommentRdo, comment, {
      excludeExtraneousValues: true,
    });
  }

  @Delete(':commentId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({})
  @ApiParam({ name: 'postId' })
  @ApiParam({ name: 'commentId' })
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 404 })
  async remove(
    @Param('postId') postId: string,
    @Param('commentId') commentId: string,
  ): Promise<void> {
    await this.commentService.remove(postId, commentId);
  }
}
