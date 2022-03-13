import { FC } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { motion } from 'framer-motion';

import classes from './Header.module.scss';
import rippleEffect from '../../utils/rippleEffect';
import { containerVariants } from '../UI/FramerMotion/MotionWrapper';

import memoriesText from '../../images/memories-Text.png';
import memoriesLogo from '../../images/memories-Logo.png';

import type { TAuthenticatedUser } from '../../stores/usersStore/user.model';

interface NavBarProps<T extends { name: string } | null> {
  user: T;
  logout: () => Promise<void>;
}

const Header: FC<NavBarProps<TAuthenticatedUser>> = ({ user, logout }) => (
  <motion.header
    className={classes.appBar}
    variants={containerVariants}
    initial='hidden'
    animate='visible'
  >
    <Link className={classes.brandContainer} to='/posts'>
      <img className={classes.text} src={memoriesText} alt='icon' />
      <img className={classes.logo} src={memoriesLogo} alt='icon' />
    </Link>
    <div className={classes.toolbar}>
      {user ? (
        <div className={classes.profile}>
          <div className={classes.purple}>{user?.name![0]}</div>
          <h6 className={classes.user}>{user?.name}</h6>
          <motion.button
            className={classes.logOut}
            type='button'
            onClick={logout}
            whileHover={{ backgroundColor: '#c51162' }}
            whileTap={{ scale: 0.8 }}
          >
            Logout
          </motion.button>
        </div>
      ) : (
        <Link className={classes.logIn} onClick={rippleEffect} to='/auth'>
          Log in
        </Link>
      )}
    </div>
  </motion.header>
);

export default observer(Header);
