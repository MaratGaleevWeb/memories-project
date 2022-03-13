import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Cache } from 'cache-manager';

import { FilesService } from '../files/files.service';
import { Post, PostDocument } from './schemas/posts.schema';
import { Comment, CommentDocument } from './schemas/comment.schema';

import { CreatePostDto, UpdatePostDto } from './dto/post.dto';
import { CreateCommentDto } from './dto/comment.dto';

import { GET_POSTS_CACHE_KEY } from '../utils/constants';

import type { TPostAndPages } from '../utils/types/TPostAndPages';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private readonly postSchema: Model<PostDocument>,
    @InjectModel(Comment.name) private readonly commentSchema: Model<CommentDocument>,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly filesService: FilesService,
  ) {}

  async createPost(
    { tags: unformattedTags, ...rest }: CreatePostDto,
    selectedFile: Express.Multer.File,
  ): Promise<Post> {
    const imageName = await this.filesService.createFile(selectedFile);
    const tags = unformattedTags.split(',').map((tag) => tag.trim());

    const newPost = await new this.postSchema({
      tags,
      selectedFile: imageName,
      ...rest,
    }).save();

    await this.clearCache();
    return newPost;
  }

  async getPostById(postId: ObjectId): Promise<Post> {
    const post = await this.postSchema.findById(postId).populate('comments').exec();
    return post;
  }

  async getPostsByQuery(searchQuery: string, tags: string, page: number): Promise<TPostAndPages> {
    const LIMIT = 12;
    const startIndex = (page - 1) * LIMIT;
    const title = new RegExp(searchQuery, 'i');
    const filterQuery = { $or: [{ title }, { tags: { $in: tags.split(',') } }] };

    const count = await this.postSchema.countDocuments(filterQuery).exec();
    const posts: Post[] = await this.postSchema
      .find(filterQuery)
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex)
      .exec();

    return { data: posts, numberOfPages: Math.ceil(count / LIMIT) };
  }

  async getPostsByPage(page: number): Promise<TPostAndPages> {
    const LIMIT = 12;
    const startIndex = (page - 1) * LIMIT;

    const count = await this.postSchema.countDocuments({}).exec();
    const posts: Post[] = await this.postSchema
      .find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex)
      .exec();

    return { data: posts, numberOfPages: Math.ceil(count / LIMIT) };
  }

  async updatePost(
    { tags: unformattedTags, _id, ...rest }: UpdatePostDto,
    selectedFile?: Express.Multer.File,
  ): Promise<Post> {
    const { selectedFile: oldFile } = await this.postSchema.findById(_id);
    const tags = unformattedTags.split(',').map((tag) => tag.trim());

    if (selectedFile) {
      const imageName = await this.filesService.updateFile(oldFile, selectedFile);
      const updatedPost = this.postSchema
        .findByIdAndUpdate(_id, { tags, selectedFile: imageName, ...rest }, { new: true })
        .exec();

      await this.clearCache();
      return updatedPost;
    }

    const updatedPost = this.postSchema
      .findByIdAndUpdate(_id, { tags, ...rest }, { new: true })
      .exec();

    await this.clearCache();
    return updatedPost;
  }

  async deletePost(postId: ObjectId): Promise<void> {
    const { selectedFile } = await this.postSchema.findByIdAndDelete(postId);
    await this.clearCache();
    this.filesService.deleteFile(selectedFile);
    this.commentSchema.deleteMany({ postId: postId as unknown as Post }).then();
  }

  async likePost(postId: ObjectId, userId: ObjectId): Promise<ObjectId[]> {
    const post = await this.postSchema.findById(postId);

    post.likes = post.likes.includes(userId)
      ? post.likes.filter((id) => id !== userId)
      : [...post.likes, userId];

    await post.save();
    await this.clearCache();

    return post.likes;
  }

  async commentPost(dto: CreateCommentDto): Promise<Comment> {
    const track = await this.postSchema.findById(dto.postId);
    const comment = await this.commentSchema.create({ ...dto });

    track.comments.push(comment._id);

    await track.save();
    await this.clearCache();

    return comment;
  }

  private async clearCache(): Promise<void> {
    const keys: string[] = await this.cacheManager.store.keys();
    keys.forEach((key) => {
      key.startsWith(GET_POSTS_CACHE_KEY) && this.cacheManager.del(key);
    });
  }
}
