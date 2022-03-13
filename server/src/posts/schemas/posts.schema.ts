import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { Comment } from './comment.schema';

export type PostDocument = Post & mongoose.Document;

@Schema()
export class Post {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  message: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  creatorId: mongoose.ObjectId;

  @Prop({ type: [String], required: true })
  tags: string[];

  @Prop({ type: String, required: true })
  selectedFile: string;

  @Prop({ type: [String], default: [] })
  likes: mongoose.ObjectId[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }], default: [] })
  comments: Comment[];

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
