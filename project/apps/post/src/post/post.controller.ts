import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post as PostMethod,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRdo } from './rdo/post.rdo';

@ApiTags('posts')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  @ApiOperation({})
  @ApiResponse({ status: 200, type: [PostRdo] })
  async findAll(): Promise<PostRdo[]> {
    const posts = await this.postService.findAll();
    return posts.map((post) =>
      plainToInstance(PostRdo, post, { excludeExtraneousValues: true }),
    );
  }

  @Get(':id')
  @ApiOperation({})
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, type: PostRdo })
  @ApiResponse({ status: 404, description: 'Публикация не найдена' })
  async findById(@Param('id') id: string): Promise<PostRdo> {
    const post = await this.postService.findById(id);
    return plainToInstance(PostRdo, post, { excludeExtraneousValues: true });
  }

  @PostMethod()
  @ApiOperation({})
  @ApiResponse({ status: 201, type: PostRdo })
  async create(@Body() dto: CreatePostDto): Promise<PostRdo> {
    // TODO: authorId — пока хардкод, позже возьмём из JWT
    const authorId = '00000000-0000-0000-0000-000000000000';
    const post = await this.postService.create(dto, authorId);
    return plainToInstance(PostRdo, post, { excludeExtraneousValues: true });
  }

  @Patch(':id')
  @ApiOperation({})
  @ApiResponse({ status: 200, type: PostRdo })
  @ApiResponse({ status: 404, description: 'Публикация не найдена' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdatePostDto,
  ): Promise<PostRdo> {
    const post = await this.postService.update(id, dto);
    return plainToInstance(PostRdo, post, { excludeExtraneousValues: true });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({})
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 404 })
  async remove(@Param('id') id: string): Promise<void> {
    await this.postService.remove(id);
  }

  @PostMethod(':id/like')
  @ApiOperation({})
  @ApiResponse({ status: 201, type: PostRdo })
  async like(@Param('id') id: string): Promise<PostRdo> {
    const userId = '00000000-0000-0000-0000-000000000000';
    const post = await this.postService.addLike(id, userId);
    return plainToInstance(PostRdo, post, { excludeExtraneousValues: true });
  }

  @Delete(':id/like')
  @ApiOperation({})
  @ApiResponse({ status: 200, type: PostRdo })
  async unlike(@Param('id') id: string): Promise<PostRdo> {
    const userId = '00000000-0000-0000-0000-000000000000';
    const post = await this.postService.removeLike(id, userId);
    return plainToInstance(PostRdo, post, { excludeExtraneousValues: true });
  }

  @PostMethod(':id/repost')
  @ApiOperation({})
  @ApiResponse({ status: 201, type: PostRdo })
  async repost(@Param('id') id: string): Promise<PostRdo> {
    const userId = '00000000-0000-0000-0000-000000000000';
    const post = await this.postService.repost(id, userId);
    return plainToInstance(PostRdo, post, { excludeExtraneousValues: true });
  }
}
