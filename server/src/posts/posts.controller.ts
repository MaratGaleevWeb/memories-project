import {
  Body,
  CacheKey,
  CacheTTL,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { ObjectId } from 'mongoose';

import { PostsService } from './posts.service';
import { ValidationPipe } from '../utils/pipes/validation.pipe';

import { HttpCacheInterceptor } from '../utils/httpCache.interceptor';

import { CreatePostDto, UpdatePostDto } from './dto/post.dto';
import { CreateCommentDto } from './dto/comment.dto';

import { AccessTokenGuard } from '../auth/guards/AccessToken.guard';

import { Post as TPost } from './schemas/posts.schema';
import { Comment } from './schemas/comment.schema';

import { GET_POSTS_CACHE_KEY } from '../utils/constants';

import type { TQuery } from '../utils/types/TQuery';
import type { TPostAndPages } from '../utils/types/TPostAndPages';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  @UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor('selectedFile'))
  createPost(
    @Body() dto: CreatePostDto,
    @UploadedFile() selectedFile: Express.Multer.File,
  ): Promise<TPost> {
    return this.postsService.createPost(dto, selectedFile);
  }

  @Get('search')
  getPostsByQuery(@Query() { searchQuery, tags, page }: TQuery): Promise<TPostAndPages> {
    return this.postsService.getPostsByQuery(searchQuery, tags, +page);
  }

  @Get()
  @UseInterceptors(HttpCacheInterceptor)
  @CacheKey(GET_POSTS_CACHE_KEY)
  @CacheTTL(120)
  getPostsByPage(@Query() { page }: { page: string }): Promise<TPostAndPages> {
    return this.postsService.getPostsByPage(+page);
  }

  @Get(':id')
  getPostById(@Param('id') postId: ObjectId): Promise<TPost> {
    return this.postsService.getPostById(postId);
  }

  @Patch()
  @UseGuards(AccessTokenGuard)
  @UseInterceptors(FileInterceptor('selectedFile'))
  updatePost(
    @Body() dto: UpdatePostDto,
    @UploadedFile() selectedFile?: Express.Multer.File,
  ): Promise<TPost> {
    return this.postsService.updatePost(dto, selectedFile);
  }

  @Delete(':id')
  @UseGuards(AccessTokenGuard)
  deletePost(@Param('id') postId: ObjectId): Promise<void> {
    return this.postsService.deletePost(postId);
  }

  @Patch('likePost')
  @UseGuards(AccessTokenGuard)
  likePost(
    @Query() { postId, userId }: { postId: ObjectId; userId: ObjectId },
  ): Promise<ObjectId[]> {
    return this.postsService.likePost(postId, userId);
  }

  @Post('commentPost')
  @UseGuards(AccessTokenGuard)
  commentPost(@Body() dto: CreateCommentDto): Promise<Comment> {
    return this.postsService.commentPost(dto);
  }
}
