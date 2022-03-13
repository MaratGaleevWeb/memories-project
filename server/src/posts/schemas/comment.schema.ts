import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { Post } from './posts.schema';

export type CommentDocument = Comment & mongoose.Document;

@Schema()
export class Comment {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  text: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post' })
  postId: Post;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
