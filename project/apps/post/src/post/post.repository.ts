import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { Post, PostStatus } from '@project/shared/app/types';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostRepository {
  private readonly posts = new Map<string, Post>();

  async findById(id: string): Promise<Post | null> {
    return this.posts.get(id) ?? null;
  }

  async findAll(): Promise<Post[]> {
    return [...this.posts.values()];
  }

  async create(dto: CreatePostDto, authorId: string): Promise<Post> {
    const now = new Date();
    const post: Post = {
      id: randomUUID(),
      title: dto.title,
      content: dto.content,
      authorId,
      tags: dto.tags ?? [],
      status: dto.status ?? PostStatus.Draft,
      createdAt: now,
      updatedAt: now,
    };
    this.posts.set(post.id, post);
    return post;
  }

  async update(id: string, dto: UpdatePostDto): Promise<Post | null> {
    const existing = this.posts.get(id);
    if (!existing) {
      return null;
    }

    const updated: Post = {
      ...existing,
      ...dto,
      updatedAt: new Date(),
    };
    this.posts.set(id, updated);
    return updated;
  }

  async remove(id: string): Promise<boolean> {
    return this.posts.delete(id);
  }

  async addLike(postId: string, userId: string): Promise<Post | null> {
    const post = this.posts.get(postId);
    if (!post) {
      return null;
    }
    return post;
  }

  async removeLike(postId: string, userId: string): Promise<Post | null> {
    const post = this.posts.get(postId);
    if (!post) {
      return null;
    }
    return post;
  }
}
