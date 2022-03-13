import * as redisStore from 'cache-manager-redis-store';
import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FilesModule } from '../files/files.module';
import { AuthModule } from '../auth/auth.module';
import { TokensModule } from '../tokens/tokens.module';

import { PostsController } from './posts.controller';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostsService } from './posts.service';

import { Post, PostSchema } from './schemas/posts.schema';
import { Comment, CommentSchema } from './schemas/comment.schema';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get<string>('REDIS_HOST'),
        port: configService.get<number>('REDIS_PORT'),
        ttl: 120,
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    FilesModule,
    AuthModule,
    TokensModule,
  ],
})
export class PostsModule {}
