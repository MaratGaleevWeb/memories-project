import $api from '../api';

import type { TPost, TPostsAndNumberOfPages } from './post.model';
import type { TComment } from '../../types/TComment';
import type { PostFetcher, PostEditor } from './post.api';

export default class HttpPostClient implements PostFetcher<TPost>, PostEditor<TPost> {
  async create(newPost: FormData): Promise<TPost> {
    const { data } = await $api.post<TPost>('/posts', newPost);
    return data;
  }

  async getById(postId: string): Promise<TPost> {
    const { data } = await $api.get<TPost>(`/posts/${postId}`);
    return data;
  }

  async getByPage(page: number): Promise<TPostsAndNumberOfPages> {
    const { data } = await $api.get<TPostsAndNumberOfPages>(`/posts?page=${page}`);
    return data;
  }

  async getBySearch(query: string, tags: string, page: number): Promise<TPostsAndNumberOfPages> {
    const { data } = await $api.get<TPostsAndNumberOfPages>(
      `/posts/search?searchQuery=${query}&tags=${tags}&page=${page}`,
    );
    return data;
  }

  async update(updatedPost: FormData): Promise<TPost> {
    const { data } = await $api.patch<TPost>('/posts', updatedPost);
    return data;
  }

  async delete(postId: string): Promise<void> {
    const { data } = await $api.delete<void>(`/posts/${postId}`);
    return data;
  }

  async like(postId: string, userId: string): Promise<string[]> {
    const { data } = await $api.patch<string[]>(
      `/posts/likePost?postId=${postId}&userId=${userId}`,
    );
    return data;
  }

  async comment(comment: TComment): Promise<TComment> {
    const { data } = await $api.post<TComment>('/posts/commentPost', comment);
    return data;
  }
}
