import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CommentProxyController } from './comment-proxy.controller';

@Module({
  imports: [HttpModule],
  controllers: [CommentProxyController],
})
export class CommentProxyModule {}
