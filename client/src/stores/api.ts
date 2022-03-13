import axios from 'axios';

import type { TAuthenticatedUser } from './usersStore/user.model';

const $api = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_API_URL,
});

$api.interceptors.request.use((config) => {
  config.headers!.authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

$api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        const { data } = await axios.get<TAuthenticatedUser>(
          `${process.env.REACT_APP_API_URL}/auth/refresh`,
          {
            withCredentials: true,
          },
        );

        localStorage.setItem('token', data!.accessToken);

        return $api.request(originalRequest);
      } catch (e) {
        console.log('Not Authorized');
      }
    }

    throw error;
  },
);

export default $api;
