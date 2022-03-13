import { FC, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { motion } from 'framer-motion';
import { Context } from '../..';

import classes from './PostDetails.module.scss';
import useDetails from '../../hooks/useDetails';

import CommentSection from './components/CommentSection';
import RecommendedPosts from '../../components/RecommendedPosts/RecommendedPosts';
import MotionWrapper from '../../components/UI/FramerMotion/MotionWrapper';
import Loader from '../../components/UI/FramerMotion/Loader';

import LikeIcon from '../../images/icons/LikeIcon';

import type { TPost } from '../../stores/postsStore/post.model';

const PostDetails: FC = () => {
  const { postsStore, userStore } = useContext(Context);

  const { user } = userStore;
  const { post, isLoading, recommendedPosts } = postsStore;
  const { setPost, setPosts, getById, getBySearch, like } = postsStore;

  const { _id, title, message, name, createdAt, tags, likes, selectedFile } = post;

  useDetails(post, getById, getBySearch, () => {
    setPost({} as TPost);
    setPosts([]);
  });

  const isIdIncludedInTheArray = user && likes && likes.includes(user!._id);

  const handleLike = (): Promise<void> => like(_id, user!._id);

  return isLoading ? (
    <Loader />
  ) : !createdAt ? (
    <MotionWrapper className={classes.container}>This post does not exist</MotionWrapper>
  ) : (
    <MotionWrapper className={classes.container}>
      <article className={classes.card}>
        <section className={classes.content}>
          <h2 className={classes.title}>{title}</h2>

          <h3 className={classes.tags}>{tags ? tags.map((tag) => `#${tag}`) : ''}</h3>

          <p className={classes.message}>{message}</p>

          <h5 className={classes.author}>Created by: {name}</h5>

          <h6 className={classes.creation}>{new Date(createdAt).toLocaleString()}</h6>

          <h6 className={classes.likes}>
            Likes: {likes.length}
            {user?.name && (
              <motion.button
                type='button'
                onClick={handleLike}
                whileTap={{ scale: 1.2 }}
                whileHover={{ backgroundColor: 'rgba(63, 81, 181, 0.1)' }}
              >
                <LikeIcon color={isIdIncludedInTheArray ? '#f50057' : '#3f51b5'} />
              </motion.button>
            )}
          </h6>

          <hr className={classes.divider} />

          <CommentSection {...post} />

          <hr className={classes.divider} />
        </section>

        <section className={classes.mediaWrap}>
          <img
            src={
              `${process.env.REACT_APP_API_URL}/images/${selectedFile}` ||
              'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
            }
            alt={title}
          />
        </section>
      </article>

      {!!recommendedPosts.length && <RecommendedPosts posts={recommendedPosts} />}
    </MotionWrapper>
  );
};

export default observer(PostDetails);
