import { FC, useContext } from 'react';
import { Navigate, Routes, Route, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { AnimatePresence } from 'framer-motion';
import { Context } from '../..';

import classes from './App.module.scss';

import Header from '../Header/Header';
import Home from '../../pages/Home/Home';
import Auth from '../../pages/Auth/Auth';
import PostDetails from '../../pages/PostDetails/PostDetails';
import NotFound from '../../pages/NotFound/NotFound';

const App: FC = () => {
  const location = useLocation();
  const { userStore } = useContext(Context);

  const { user, logout } = userStore;

  return (
    <div className={classes.wrapper}>
      <Header user={user} logout={logout} />
      <main className={classes.page}>
        <AnimatePresence exitBeforeEnter>
          <Routes location={location} key={location.key}>
            <Route path='/' element={<Navigate to='/posts' />} />
            <Route path='/posts' element={<Home />} />
            <Route path='/posts/:id' element={<PostDetails />} />
            <Route path='/auth' element={user ? <Navigate to='/posts' /> : <Auth />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default observer(App);
