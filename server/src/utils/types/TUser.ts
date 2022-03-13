import { UserDocument } from '../../users/users.schema';

export type TUser = Pick<UserDocument, '_id' | 'name' | 'email' | 'accessToken' | 'refreshToken'>;
