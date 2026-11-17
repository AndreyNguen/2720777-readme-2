import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  ParseUUIDPipe,
  Delete,
  HttpCode,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { AuthenticatedUser } from '../auth/interfaces/jwt-payload.interface';
import { CreateCommentGatewayDto } from './dto/create-comment.dto';
import { UpdateCommentGatewayDto } from './dto/update-comment.dto';

@ApiTags('Comments')
@Controller('posts/:postId/comments')
export class CommentProxyController {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  @ApiOperation({})
  async findAll(
    @Param('postId', ParseUUIDPipe) postId: string,
    @Query() query: Record<string, unknown>,
  ) {
    const url = `${this.configService.get('POST_SERVICE_URL')}/posts/${postId}/comments`;
    const { data } = await firstValueFrom(
      this.httpService.get(url, { params: query }),
    );
    return data;
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({})
  async create(
    @Param('postId', ParseUUIDPipe) postId: string,
    @Body() dto: CreateCommentGatewayDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    const url = `${this.configService.get('POST_SERVICE_URL')}/posts/${postId}/comments`;
    const { data } = await firstValueFrom(
      this.httpService.post(url, dto, { headers: { 'X-User-Id': user.id } }),
    );
    return data;
  }

  @Get(':commentId')
  @ApiOperation({})
  async findById(
    @Param('postId', ParseUUIDPipe) postId: string,
    @Param('commentId', ParseUUIDPipe) commentId: string,
  ) {
    const url = `${this.configService.get('POST_SERVICE_URL')}/posts/${postId}/comments/${commentId}`;
    const { data } = await firstValueFrom(this.httpService.get(url));
    return data;
  }

  @Patch(':commentId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({})
  async update(
    @Param('postId', ParseUUIDPipe) postId: string,
    @Param('commentId', ParseUUIDPipe) commentId: string,
    @Body() dto: UpdateCommentGatewayDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    const url = `${this.configService.get('POST_SERVICE_URL')}/posts/${postId}/comments/${commentId}`;
    const { data } = await firstValueFrom(
      this.httpService.patch(url, dto, { headers: { 'X-User-Id': user.id } }),
    );
    return data;
  }

  @Delete(':commentId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({})
  async remove(
    @Param('postId', ParseUUIDPipe) postId: string,
    @Param('commentId', ParseUUIDPipe) commentId: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    const url = `${this.configService.get('POST_SERVICE_URL')}/posts/${postId}/comments/${commentId}`;
    await firstValueFrom(
      this.httpService.delete(url, { headers: { 'X-User-Id': user.id } }),
    );
  }
}
