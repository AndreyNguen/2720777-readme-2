import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Post } from '@project/shared/app/types';
import { PostRepository } from './post.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { QueryPostDto } from './dto/query-post.dto';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async findAll(query: QueryPostDto) {
    return this.postRepository.findAll(query);
  }

  async findById(id: string): Promise<Post> {
    const post = await this.postRepository.findById(id);
    if (!post) {
      throw new NotFoundException('Пост не найден');
    }
    return post;
  }

  async create(dto: CreatePostDto, authorId: string): Promise<Post> {
    return this.postRepository.create(dto, authorId);
  }

  async update(id: string, dto: UpdatePostDto, userId: string): Promise<Post> {
    const post = await this.findById(id);
    if (post.authorId !== userId) {
      throw new ForbiddenException('Вы можете редачить только свои посты');
    }

    const updatedPost = await this.postRepository.update(id, dto);
    if (!updatedPost) {
      throw new NotFoundException('Не удалось обновить пост');
    }

    return updatedPost;
  }

  async remove(id: string, userId: string): Promise<void> {
    const post = await this.findById(id);
    if (post.authorId !== userId) {
      throw new ForbiddenException('Можно удалять только свои публикации');
    }
    await this.postRepository.remove(id);
  }

  async repost(postId: string, userId: string): Promise<Post> {
    const original = await this.findById(postId);

    return this.postRepository.create(
      {
        title: `Репост: ${original.title}`,
        content: original.content,
        tags: original.tags,
        status: original.status,
      },
      userId,
    );
  }

  async addLike(postId: string, userId: string) {
    const post = await this.postRepository.addLike(postId, userId);
    if (!post) {
      throw new NotFoundException('Пост не найден');
    }
    return post;
  }

  async removeLike(postId: string, userId: string) {
    const post = await this.postRepository.removeLike(postId, userId);
    if (!post) {
      throw new NotFoundException('Пост не найден');
    }
    return post;
  }
}
