import { Injectable, NotFoundException } from '@nestjs/common';
import { extname, basename } from 'node:path';
import { MediaRepository } from './media.repository';
import { CreateMediaDto } from './dto/create-media.dto';
import { Media, MediaType } from '@project/shared/app/types';

const VIDEO_EXT = ['.mp4', '.avi', '.webm'];
const AUDIO_EXT = ['.mp3', '.wav', '.ogg'];
const IMAGE_EXT = ['.jpg', '.jpeg', '.png', '.webp'];

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

    const size = dto.url.length * 100;

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

    if (VIDEO_EXT.includes(ext)) return MediaType.Video;
    if (AUDIO_EXT.includes(ext)) return MediaType.Audio;
    if (IMAGE_EXT.includes(ext)) return MediaType.Image;

    return MediaType.File;
  }
}
