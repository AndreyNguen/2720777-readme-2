import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { MediaService } from './media.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { MediaRdo } from './rdo/media.rdo';

@ApiTags('media')
@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get()
  @ApiOperation({})
  @ApiResponse({ status: 200, type: [MediaRdo] })
  async findAll(): Promise<MediaRdo[]> {
    const items = await this.mediaService.findAll();
    return items.map((item) =>
      plainToInstance(MediaRdo, item, { excludeExtraneousValues: true }),
    );
  }

  @Get(':id')
  @ApiOperation({})
  @ApiResponse({ status: 200, type: MediaRdo })
  @ApiResponse({ status: 404 })
  async findById(@Param('id') id: string): Promise<MediaRdo> {
    const item = await this.mediaService.findById(id);
    return plainToInstance(MediaRdo, item, { excludeExtraneousValues: true });
  }

  @Post('download')
  @ApiOperation({})
  @ApiResponse({ status: 201, type: MediaRdo })
  async download(@Body() dto: CreateMediaDto): Promise<MediaRdo> {
    const item = await this.mediaService.download(dto);
    return plainToInstance(MediaRdo, item, { excludeExtraneousValues: true });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({})
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 404 })
  async remove(@Param('id') id: string): Promise<void> {
    await this.mediaService.remove(id);
  }
}
