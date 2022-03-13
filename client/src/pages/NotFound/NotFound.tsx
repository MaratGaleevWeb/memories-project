import { FC } from 'react';

import classes from './NotFound.module.scss';
import MotionWrapper from '../../components/UI/FramerMotion/MotionWrapper';
import useRedirect from '../../hooks/useRedirect';

const NotFound: FC = () => {
  useRedirect();

  return (
    <MotionWrapper className={classes.container}>
      <h2 className={classes.title}>404 - Page not found</h2>
      <h4 className={classes.subTitle}>The page you were looking for does not exist</h4>
      <p className={classes.text}>You will be redirected to the home page in a few seconds</p>
    </MotionWrapper>
  );
};

export default NotFound;
