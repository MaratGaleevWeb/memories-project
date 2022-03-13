import { makeAutoObservable } from 'mobx';

import type { TPost, PostValidationErrors } from './post.model';
import type { TComment } from '../../types/TComment';
import type { PostFetcher, PostEditor } from './post.api';

export default class PostsStore implements PostFetcher<void>, PostEditor<void> {
  posts: TPost[] = [];

  post: TPost = {} as TPost;

  numberOfPages = 0;

  isLoading = false;

  errors: PostValidationErrors = {};

  constructor(private postsService: PostFetcher<TPost> & PostEditor<TPost>) {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get sortedPosts(): TPost[] {
    return [...this.posts].sort((a, b) => +b.createdAt - +a.createdAt);
  }

  get recommendedPosts(): TPost[] {
    return [...this.posts].filter(({ _id }) => _id !== this.post._id);
  }

  setPosts(posts: TPost[]): void {
    this.posts = posts;
  }

  setPost(post: TPost): void {
    this.post = post;
  }

  setNumberOfPages(number: number): void {
    this.numberOfPages = number;
  }

  setIsLoading(boolean: boolean): void {
    this.isLoading = boolean;
  }

  setErrors(error: PostValidationErrors): void {
    this.errors = error;
  }

  create(newPost: FormData): Promise<void> {
    this.setIsLoading(true);
    return this.postsService
      .create(newPost)
      .then((post) => this.setPosts([post, ...this.posts]))
      .catch(({ response }) => this.setErrors(response.data))
      .finally(() => this.setIsLoading(false));
  }

  getById(postId: string): Promise<void> {
    this.setIsLoading(true);
    return this.postsService
      .getById(postId)
      .then(this.setPost)
      .finally(() => this.setIsLoading(false));
  }

  getByPage(page: number): Promise<void> {
    this.setIsLoading(true);
    return this.postsService
      .getByPage(page)
      .then(({ data, numberOfPages }) => {
        this.setPosts([...this.posts, ...data]);
        this.setNumberOfPages(numberOfPages);
      })
      .finally(() => this.setIsLoading(false));
  }

  getBySearch(query: string, tags: string, page: number): Promise<void> {
    this.setNumberOfPages(1);
    this.setIsLoading(true);
    return this.postsService
      .getBySearch(query, tags, page)
      .then(({ data, numberOfPages }) => {
        this.setPosts([...this.posts, ...data]);
        this.setNumberOfPages(numberOfPages);
      })
      .finally(() => this.setIsLoading(false));
  }

  update(newPost: FormData): Promise<void> {
    this.setIsLoading(true);
    return this.postsService
      .update(newPost)
      .then((updatedPost) =>
        this.setPosts(
          this.posts.map((post) => (post._id === updatedPost._id ? updatedPost : post)),
        ),
      )
      .finally(() => this.setIsLoading(false));
  }

  delete(postId: string): Promise<void> {
    return this.postsService
      .delete(postId)
      .then(() => this.setPosts(this.posts.filter(({ _id }) => _id !== postId)));
  }

  like(postId: string, userId: string): Promise<void> {
    return this.postsService
      .like(postId, userId)
      .then((likes) =>
        this.post._id
          ? this.setPost({ ...this.post, likes })
          : this.setPosts(
              this.posts.map((post) => (post._id === postId ? { ...post, likes } : post)),
            ),
      );
  }

  comment(comment: TComment): Promise<void> {
    return this.postsService
      .comment(comment)
      .then((savedComment) =>
        this.setPost({ ...this.post, comments: [...this.post.comments, savedComment] }),
      );
  }
}
