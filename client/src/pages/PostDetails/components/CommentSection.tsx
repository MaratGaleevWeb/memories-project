import { FC, useState, useRef, useContext, ChangeEvent } from 'react';
import { observer } from 'mobx-react-lite';
import { motion } from 'framer-motion';
import { Context } from '../../..';

import classes from './CommentSection.module.scss';

import type { TComment } from '../../../types/TComment';

interface CommentSectionProps {
  _id: string;
  comments: TComment[];
}

const CommentSection: FC<CommentSectionProps> = ({ _id, comments }) => {
  const { postsStore, userStore } = useContext(Context);
  const { user } = userStore;
  const { comment: commentPost } = postsStore;

  const [comment, setComment] = useState('');

  const ref = useRef<HTMLDivElement>(null);

  const handleClick = async (): Promise<void> => {
    await commentPost({ name: user!.name, text: comment, postId: _id });

    setComment('');

    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value);

  return (
    <section className={classes.section}>
      <div className={classes.left}>
        <h3 className={classes.title}>Comments</h3>

        {comments?.map(({ name, text, _id: commentID }) => (
          <p className={classes.comment} key={commentID}>
            <span>{name}:</span> {text}
          </p>
        ))}
        <div ref={ref} />
      </div>

      {user?.name && (
        <div className={classes.right}>
          <h3 className={classes.title}>Write a comment</h3>

          <div className={classes.textareaWrap}>
            <textarea
              className={classes.textarea}
              name='Comment'
              id='Comment'
              placeholder=' '
              value={comment}
              onChange={handleChange}
              rows={4}
              cols={50}
            />
            <label className={classes.label} htmlFor='Comment'>
              Comment
            </label>
          </div>

          <motion.button
            className={classes.btn}
            type='button'
            disabled={!comment}
            onClick={handleClick}
            whileTap={{ scale: 0.8 }}
          >
            Comment
          </motion.button>
        </div>
      )}
    </section>
  );
};

export default observer(CommentSection);
