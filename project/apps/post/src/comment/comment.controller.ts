import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UnauthorizedException,
  Headers,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentRdo } from './rdo/comment.rdo';
import { QueryCommentDto } from './dto/query-comment.dto';

@ApiTags('comments')
@Controller('posts/:postId/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  @ApiOperation({})
  async findAll(
    @Param('postId', ParseUUIDPipe) postId: string,
    @Query() query: QueryCommentDto,
  ) {
    const comments = await this.commentService.findByPostId(postId, query);
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
    @Param('postId', ParseUUIDPipe) postId: string,
    @Body() dto: CreateCommentDto,
    @Headers('X-User-Id') userId: string,
  ): Promise<CommentRdo> {
    if (!userId) {
      throw new UnauthorizedException('Пользователь не авторизован');
    }
    const comment = await this.commentService.create(postId, dto, userId);
    return plainToInstance(CommentRdo, comment, {
      excludeExtraneousValues: true,
    });
  }

  @Patch(':commentId')
  async update(
    @Param('postId', ParseUUIDPipe) postId: string,
    @Param('commentId', ParseUUIDPipe) commentId: string,
    @Body() dto: UpdateCommentDto,
    @Headers('X-User-Id') userId: string,
  ): Promise<CommentRdo> {
    const comment = await this.commentService.update(
      postId,
      commentId,
      dto,
      userId,
    );
    return plainToInstance(CommentRdo, comment, {
      excludeExtraneousValues: true,
    });
  }

  @Delete(':commentId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('postId', ParseUUIDPipe) postId: string,
    @Param('commentId', ParseUUIDPipe) commentId: string,
    @Headers('X-User-Id') userId: string,
  ): Promise<void> {
    await this.commentService.remove(postId, commentId, userId);
  }
}
