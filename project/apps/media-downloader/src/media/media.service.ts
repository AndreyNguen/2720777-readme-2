import { Injectable, NotFoundException } from '@nestjs/common';
import { extname, basename } from 'node:path';
import { MediaRepository } from './media.repository';
import { CreateMediaDto } from './dto/create-media.dto';
import { Media, MediaType } from '@project/shared/app/types';
import { MEDIA_EXTENSIONS, MULTIPLIER_SIZE } from './media.constants';

@Injectable()
export class MediaService {
  constructor(private readonly mediaRepository: MediaRepository) {}

  async findAll(): Promise<Media[]> {
    return this.mediaRepository.findAll();
  }

  async findById(id: string): Promise<Media> {
    const media = this.mediaRepository.findById(id);
    if (!media) {
      throw new NotFoundException('Медиа не найдено');
    }
    return media;
  }

  async download(dto: CreateMediaDto): Promise<Media> {
    const url = new URL(dto.url);
    const filename = basename(url.pathname) || 'file';
    const type = this.detectType(filename);

    const size = dto.url.length * MULTIPLIER_SIZE;

    return this.mediaRepository.create({
      type,
      url: dto.url,
      filename,
      size,
    });
  }

  async remove(id: string): Promise<void> {
    const removed = this.mediaRepository.remove(id);
    if (!removed) {
      throw new NotFoundException('Медиа не найдено');
    }
  }

  private detectType(filename: string): MediaType {
    const ext = extname(filename).toLowerCase();

    for (const [type, extensions] of Object.entries(MEDIA_EXTENSIONS)) {
      if (extensions.includes(ext as never)) {
        return type as MediaType;
      }
    }

    return MediaType.File;
  }
}
