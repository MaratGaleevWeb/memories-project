import type { TUser, TAuthenticatedUser } from './user.model';

export interface UserAuthentication<T extends TAuthenticatedUser | void> {
  registration: (user: TUser) => Promise<void>;
  login: (user: TUser) => Promise<T>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<T>;
  googleLogin: (accessToken: string) => Promise<T>;
}
