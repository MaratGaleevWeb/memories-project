import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import classes from './RecommendedPost.module.scss';

import type { TPost } from '../../../stores/postsStore/post.model';

const RecommendedPost: FC<TPost> = ({ _id, title, name, likes, selectedFile }) => {
  const navigate = useNavigate();
  const handleNavigate = () => navigate(`/posts/${_id}`);

  return (
    <>
      <article className={classes.post} onClick={handleNavigate}>
        <h4 className={classes.title}>{title}</h4>

        <h5 className={classes.name}>{name}</h5>

        <h6 className={classes.likes}>Likes: {likes.length}</h6>

        <img
          className={classes.image}
          src={`${process.env.REACT_APP_API_URL}/images/${selectedFile}`}
          alt={title}
        />
      </article>
      <hr className={classes.divider} />
    </>
  );
};
export default observer(RecommendedPost);
