import { Injectable } from '@nestjs/common';
import { Media, MediaType } from '@project/shared/app/types';
import { randomUUID } from 'node:crypto';

export interface CreateMediaData {
  type: MediaType;
  url: string;
  filename: string;
  size: number;
}

@Injectable()
export class MediaRepository {
  private readonly items = new Map<string, Media>();

  findById(id: string) {
    return this.items.get(id) ?? null;
  }

  findAll() {
    return [...this.items.values()];
  }

  create(data: CreateMediaData) {
    const media: Media = {
      id: randomUUID(),
      type: data.type,
      url: data.url,
      filename: data.filename,
      size: data.size,
      createdAt: new Date(),
    };
    this.items.set(media.id, media);
    return media;
  }

  remove(id: string) {
    return this.items.delete(id);
  }
}
