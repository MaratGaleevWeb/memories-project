import { FC, useContext, ChangeEvent, FormEvent } from 'react';
import { observer } from 'mobx-react-lite';
import { motion } from 'framer-motion';
import { Context } from '../..';

import classes from './Form.module.scss';
import validatePost from '../../utils/validatePost';
import formPost from '../../utils/formPost';

import FileInput from './components/FileInput';
import PostInput from './components/PostInput';

import type { TPost } from '../../stores/postsStore/post.model';

const Form: FC = () => {
  const { userStore, postsStore } = useContext(Context);

  const { user } = userStore;
  const { post, errors, setPost, setErrors, create, update } = postsStore;
  const { _id, title, message, tags, selectedFile } = post;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const validationErrors = validatePost({ ...post, tags: tags as unknown as string });
    if (Object.keys(validationErrors).length) {
      return setErrors(validationErrors);
    }
    setErrors({});

    const newPost = formPost(post, user!.name, user!._id);

    _id ? await update(newPost) : await create(newPost);

    setPost({} as TPost);
  };

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>): void =>
    setPost({ ...post, [target.name]: target.value });

  const handleFile = (selectedFile: Blob): void => setPost({ ...post, selectedFile });

  const resetPostsAndErrors = () => {
    setPost({} as TPost);
    setErrors({});
  };

  return !user ? (
    <h6 className={classes.unSignedIn}>
      Please sign in to create your own memories and like other&apos;s
    </h6>
  ) : (
    <div className={classes.container}>
      <form className={classes.form} autoComplete='off' onSubmit={handleSubmit}>
        <h4 className={classes.label}>{_id ? 'Editing' : 'Creating'} a Memory</h4>

        <PostInput
          title='title'
          value={title || ''}
          error={errors.title}
          handleChange={handleChange}
        />

        <PostInput
          title='message'
          value={message || ''}
          error={errors.message}
          handleChange={handleChange}
        />

        <PostInput
          title='tags'
          value={tags || ''}
          error={errors.tags}
          handleChange={handleChange}
        />

        <FileInput image={selectedFile} handleFile={handleFile} />

        {errors.selectedFile && <p className={classes.fileError}>{errors.selectedFile}</p>}

        <motion.button
          className={classes.buttonSubmit}
          type='submit'
          whileHover={{ backgroundColor: '#303f9f' }}
          whileTap={{ scale: 0.8 }}
        >
          Submit
        </motion.button>

        <motion.button
          className={classes.buttonClear}
          type='reset'
          onClick={resetPostsAndErrors}
          whileHover={{ backgroundColor: '#c51162' }}
          whileTap={{ scale: 0.8 }}
        >
          Clear
        </motion.button>
      </form>
    </div>
  );
};

export default observer(Form);
