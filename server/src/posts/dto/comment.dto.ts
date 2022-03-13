import { ObjectId } from 'mongoose';

export class CreateCommentDto {
  readonly postId: ObjectId;

  readonly name: string;

  readonly text: string;
}
