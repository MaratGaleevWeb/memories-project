import { FC, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { motion } from 'framer-motion';
import { Context } from '../../..';

import classes from './Post.module.scss';

import MoreIcon from '../../../images/icons/MoreIcon';
import LikeIcon from '../../../images/icons/LikeIcon';
import DeleteIcon from '../../../images/icons/DeleteIcon';

import type { TPost } from '../../../stores/postsStore/post.model';

const Post: FC<TPost> = (post) => {
  const { _id, title, message, name, creatorId, selectedFile, tags, likes, createdAt } = post;

  const navigate = useNavigate();

  const { userStore, postsStore } = useContext(Context);

  const { post: postInStore, setPost, like, delete: deletePost } = postsStore;
  const { user } = userStore;

  const isCreator = user?._id === creatorId;

  const isStoreFilledAndIdIncludedInTheArray = user && likes.includes(user?._id);

  const handleSet = (): void => setPost(post);

  const handleLike = (): Promise<void> => like(_id, user!._id);

  const hanldeNavigate = (): void => navigate(`/posts/${_id}`);

  const handleDelete = (): Promise<void> => deletePost(_id);

  return (
    <article className={classes.card}>
      <header className={classes.header}>
        <div>
          <h6 className={classes.name}>{name}</h6>
          <p className={classes.date}>{new Date(createdAt).toLocaleString()}</p>
        </div>
        {isCreator && (
          <motion.button className={classes.icon} onClick={handleSet} whileTap={{ scale: 0.8 }}>
            <MoreIcon />
          </motion.button>
        )}
      </header>

      <div
        className={classes.mediawrap}
        style={{
          backgroundImage: `url(${process.env.REACT_APP_API_URL}/images/${selectedFile})`,
        }}
      />

      <section className={classes.info}>
        <p className={classes.tags}>{tags.map((tag) => ` #${tag}`)}</p>

        <h5 className={classes.title}>{title}</h5>

        <p className={classes.text}>{message.slice(0, 40)}...</p>

        <footer className={classes.cardActions}>
          <motion.button
            type='button'
            disabled={!user || !!postInStore._id}
            onClick={handleLike}
            whileTap={{ scale: 1.2 }}
            whileHover={{ backgroundColor: 'rgba(63, 81, 181, 0.1)' }}
          >
            <LikeIcon color={isStoreFilledAndIdIncludedInTheArray ? '#f50057' : 'currentColor'} />
            &nbsp;Like&nbsp;
            {likes.length}&nbsp;
          </motion.button>

          <motion.button
            type='button'
            onClick={hanldeNavigate}
            whileTap={{ scale: 1.2 }}
            whileHover={{ backgroundColor: 'rgba(63, 81, 181, 0.1)' }}
          >
            More...
          </motion.button>

          {isCreator && (
            <motion.button
              type='button'
              onClick={handleDelete}
              whileTap={{ scale: 1.2 }}
              whileHover={{ backgroundColor: 'rgba(63, 81, 181, 0.1)' }}
            >
              <DeleteIcon />
              Delete
            </motion.button>
          )}
        </footer>
      </section>
    </article>
  );
};

export default observer(Post);
