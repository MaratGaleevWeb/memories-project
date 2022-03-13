import { FC, ChangeEvent } from 'react';
import { observer } from 'mobx-react-lite';

import classes from './PostInput.module.scss';

import type { TPostInputTitle } from '../../../stores/postsStore/post.model';

interface PostInputProps {
  title: TPostInputTitle;
  value: string | string[];
  error?: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const PostInput: FC<PostInputProps> = ({ title, value, error, handleChange }) => (
  <div className={classes.inputWrap}>
    <input
      className={classes.input}
      name={title}
      id={title}
      placeholder=' '
      value={value}
      type='text'
      onChange={handleChange}
    />
    <label className={classes.label} htmlFor={title}>
      {title[0].toUpperCase() + title.slice(1)}
    </label>
    {error && <p className={classes.error}>{error}</p>}
  </div>
);

export default observer(PostInput);
