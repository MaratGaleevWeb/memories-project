import { TPost } from '../stores/postsStore/post.model';

export default function formPost(
  { _id, title, message, tags, selectedFile }: TPost,
  localUserName: string,
  localUserId: string,
): FormData {
  const newPost = new FormData();

  _id && newPost.append('_id', _id);
  newPost.append('creatorId', localUserId || '');
  newPost.append('name', localUserName || '');
  newPost.append('title', title || '');
  newPost.append('message', message || '');
  newPost.append('tags', (tags as unknown as string) || '');
  newPost.append('selectedFile', selectedFile);

  return newPost;
}
