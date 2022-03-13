import $api from '../api';

import type { TUser, TAuthenticatedUser } from './user.model';
import type { UserAuthentication } from './user.api';

export default class HttpUserClient implements UserAuthentication<TAuthenticatedUser> {
  async registration(user: TUser): Promise<void> {
    await $api.post('/auth/registration', user);
  }

  async login(user: TUser): Promise<TAuthenticatedUser> {
    const { data } = await $api.post<TAuthenticatedUser>('/auth/login', user);
    return data;
  }

  async logout(): Promise<void> {
    await $api.post('/auth/logout');
  }

  async checkAuth(): Promise<TAuthenticatedUser> {
    const { data } = await $api.get<TAuthenticatedUser>('auth/refresh');
    return data;
  }

  async googleLogin(accessToken: string): Promise<TAuthenticatedUser> {
    const { data } = await $api.post<TAuthenticatedUser>('google-auth', { accessToken });
    return data;
  }
}
