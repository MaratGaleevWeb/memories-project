import { TComment } from '../../types/TComment';

export type TPost = {
  _id: string;
  title: string;
  message: string;
  name: string;
  creatorId: string;
  selectedFile: string | Blob;
  tags: string[];
  createdAt: Date;
  likes: string[];
  comments: TComment[];
};

export type TPostInputTitle = 'title' | 'message' | 'tags';

export type PostValidationErrors = { [P in TPostInputTitle]?: string } & { selectedFile?: string };

export type TPostsAndNumberOfPages = {
  data: TPost[];
  numberOfPages: number;
};
