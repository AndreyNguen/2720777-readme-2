import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { Comment } from '@project/shared/app/types';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentRepository {
  private readonly comments = new Map<string, Comment>();

  async findById(id: string): Promise<Comment | null> {
    return this.comments.get(id) ?? null;
  }

  async findByPostId(postId: string): Promise<Comment[]> {
    return [...this.comments.values()].filter((c) => c.postId === postId);
  }

  async create(
    postId: string,
    dto: CreateCommentDto,
    authorId: string,
  ): Promise<Comment> {
    const now = new Date();
    const comment: Comment = {
      id: randomUUID(),
      postId,
      authorId,
      content: dto.content,
      createdAt: now,
      updatedAt: now,
    };
    this.comments.set(comment.id, comment);
    return comment;
  }

  async update(id: string, dto: UpdateCommentDto): Promise<Comment | null> {
    const existing = this.comments.get(id);
    if (!existing) {
      return null;
    }

    const updated: Comment = {
      ...existing,
      ...dto,
      updatedAt: new Date(),
    };
    this.comments.set(id, updated);
    return updated;
  }

  async remove(id: string): Promise<boolean> {
    return this.comments.delete(id);
  }
}
