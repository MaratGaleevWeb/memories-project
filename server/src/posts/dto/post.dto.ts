import { IsNotEmpty, IsOptional, Length } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreatePostDto {
  @IsNotEmpty({ message: 'CreatorId must not be empty' })
  readonly creatorId: ObjectId;

  @IsNotEmpty({ message: 'Name must not be empty' })
  readonly name: string;

  @Length(2, 60, {
    message: 'Length must be greater than 2 characters and less than 60 characters',
  })
  readonly title: string;

  @Length(2, 1500, {
    message: 'Length must be greater than 2 characters and less than 1500 characters',
  })
  readonly message: string;

  @Length(1, 200, {
    message: 'There are too many hashtags or they are too long',
  })
  readonly tags: string;
}

export class UpdatePostDto {
  @IsNotEmpty({ message: 'Id must not be empty' })
  readonly _id: ObjectId;

  @IsNotEmpty({ message: 'CreatorId must not be empty' })
  readonly creatorId: ObjectId;

  @IsNotEmpty({ message: 'Name must not be empty' })
  readonly name: string;

  @IsOptional()
  @Length(2, 60, {
    message: 'Length must be greater than 2 characters and less than 60 characters',
  })
  readonly title?: string;

  @IsOptional()
  @Length(2, 1500, {
    message: 'Length must be greater than 2 characters and less than 1500 characters',
  })
  readonly message?: string;

  @IsOptional()
  @Length(2, 200, {
    message: 'There are too many hashtags or they are too long',
  })
  readonly tags?: string;

  @IsOptional()
  readonly selectedFile?: string;
}
