import { makeAutoObservable } from 'mobx';

import type { UserAuthentication } from './user.api';
import type { TUser, TUserValidationErrors, TAuthenticatedUser } from './user.model';

export default class UserStore implements UserAuthentication<void> {
  user: TAuthenticatedUser = null;

  errors: TUserValidationErrors = {};

  constructor(private usersService: UserAuthentication<TAuthenticatedUser>) {
    makeAutoObservable(this, {}, { autoBind: true });
    localStorage.getItem('token') && this.checkAuth();
  }

  setLocalUser(user: TAuthenticatedUser): void {
    this.user = user;
  }

  setErrors(errors: TUserValidationErrors): void {
    this.errors = errors;
  }

  registration(user: TUser): Promise<void> {
    this.setErrors({});
    return this.usersService
      .registration(user)
      .catch(({ response }) => this.setErrors(response.data));
  }

  login(user: TUser): Promise<void> {
    this.setErrors({});
    return this.usersService
      .login(user)
      .then(this.updateStorageAndLocalUser)
      .catch(({ response }) => this.setErrors(response.data));
  }

  logout(): Promise<void> {
    return this.usersService.logout().then(() => {
      localStorage.removeItem('token');
      this.setLocalUser(null);
    });
  }

  checkAuth(): Promise<void> {
    return this.usersService.checkAuth().then(this.updateStorageAndLocalUser);
  }

  googleLogin(accessToken: string): Promise<void> {
    return this.usersService.googleLogin(accessToken).then(this.updateStorageAndLocalUser);
  }

  private updateStorageAndLocalUser(data: TAuthenticatedUser): void {
    localStorage.setItem('token', data!.accessToken);
    this.setLocalUser(data);
  }
}
