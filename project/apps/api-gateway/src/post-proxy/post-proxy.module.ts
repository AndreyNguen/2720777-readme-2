import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PostProxyController } from './post-proxy.controller';

@Module({
  imports: [HttpModule],
  controllers: [PostProxyController],
})
export class PostProxyModule {}
