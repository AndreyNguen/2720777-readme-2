import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { PostProxyModule } from '../post-proxy/post-proxy.module';
import { CommentProxyModule } from '../comment-proxy/comment-proxy.module';
import { AuthProxyModule } from '../auth/auth-proxy.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'apps/api-gateway/.env',
    }),
    HttpModule,
    PassportModule,
    PostProxyModule,
    CommentProxyModule,
    AuthProxyModule,
  ],
  providers: [JwtStrategy],
})
export class AppModule {}
