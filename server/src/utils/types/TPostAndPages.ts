import type { Post } from 'src/posts/schemas/posts.schema';

export type TPostAndPages = {
  data: Post[];
  numberOfPages: number;
};
