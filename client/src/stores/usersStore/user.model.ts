export type TUserInputTitle = 'firstName' | 'lastName' | 'email' | 'password' | 'confirmPassword';

export type TUser = { [P in TUserInputTitle]: string };

export type TUserValidationErrors = Partial<TUser>;

export type TAuthenticatedUser = {
  _id: string;
  email: string;
  name: string;
  accessToken: string;
  refreshToken: string;
} | null;
