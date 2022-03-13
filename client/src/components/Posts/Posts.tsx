import { FC, RefObject } from 'react';
import { observer } from 'mobx-react-lite';
import { AnimatePresence } from 'framer-motion';

import classes from './Posts.module.scss';

import Post from './Post/Post';
import Loader from '../UI/FramerMotion/Loader';
import AnimatedListItem from '../UI/FramerMotion/AnimatedListItem';

import type { TPost } from '../../stores/postsStore/post.model';

interface PostsProps {
  posts: TPost[];
  isLoading: boolean;
  innerRef: RefObject<HTMLLIElement>;
}

const Posts: FC<PostsProps> = ({ posts, isLoading, innerRef }) => (
  <div className={classes.container}>
    {isLoading && posts.length === 0 ? (
      <Loader />
    ) : !posts.length ? (
      <h4 className={classes.noPosts}>
        There are no posts with search tearms you entered or maybe there are no posts created yet
      </h4>
    ) : (
      <ul className={classes.grid}>
        <AnimatePresence>
          {posts.map((post, index) => (
            <AnimatedListItem key={post._id} className={classes.post} index={index}>
              <Post {...post} />
            </AnimatedListItem>
          ))}
          <li ref={innerRef} className={classes.invisible} />
        </AnimatePresence>
      </ul>
    )}
  </div>
);

export default observer(Posts);
