import React, { createContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';

import './styles/styles.scss';

import App from './components/App/App';

import PostsStore from './stores/postsStore/posts.store';
import UserStore from './stores/usersStore/user.store';

import HttpPostClient from './stores/postsStore/post.http.client';
import HttpUserClient from './stores/usersStore/user.http.client';

interface State {
  postsStore: PostsStore;
  userStore: UserStore;
}

const postsStore = new PostsStore(new HttpPostClient());
const userStore = new UserStore(new HttpUserClient());

export const Context = createContext<State>({ postsStore, userStore });

ReactDOM.render(
  <React.StrictMode>
    <Context.Provider value={{ postsStore, userStore }}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Context.Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
