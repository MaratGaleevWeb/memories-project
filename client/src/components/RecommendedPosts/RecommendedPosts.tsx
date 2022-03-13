import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { AnimatePresence } from 'framer-motion';

import classes from './RecommendedPosts.module.scss';

import AnimatedListItem from '../UI/FramerMotion/AnimatedListItem';
import RecommendedPost from './RecommendedPost/RecommendedPost';

import type { TPost } from '../../stores/postsStore/post.model';

interface RecommendedPostsProps {
  posts: TPost[];
}

const RecommendedPosts: FC<RecommendedPostsProps> = ({ posts }) => (
  <section className={classes.section}>
    <h4 className={classes.also}>You might also like:</h4>

    <hr className={classes.divider} />

    <ul className={classes.posts}>
      <AnimatePresence>
        {posts.map((post, index) => (
          <AnimatedListItem key={post._id} index={index}>
            <RecommendedPost {...post} />
          </AnimatedListItem>
        ))}
      </AnimatePresence>
    </ul>
  </section>
);

export default observer(RecommendedPosts);
