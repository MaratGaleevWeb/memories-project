import type { TPost, TPostsAndNumberOfPages } from './post.model';
import type { TComment } from '../../types/TComment';

export interface PostFetcher<T extends TPost | void> {
  getById: (dataId: string) => Promise<T>;
  getByPage: (page: number) => Promise<T extends TPost ? TPostsAndNumberOfPages : void>;
  getBySearch: (
    query: string,
    tags: string,
    page: number,
  ) => Promise<T extends TPost ? TPostsAndNumberOfPages : void>;
}

export interface PostEditor<T extends TPost | void> {
  create: (data: FormData) => Promise<T>;
  update: (updatedData: FormData) => Promise<T>;
  like: (dataId: string, userId: string) => Promise<T extends TPost ? string[] : void>;
  comment: (comment: TComment) => Promise<T extends TPost ? TComment : void>;
  delete: (dataId: string) => Promise<void>;
}
