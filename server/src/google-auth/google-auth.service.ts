import { Injectable, UnauthorizedException } from '@nestjs/common';
import { google, Auth } from 'googleapis';

import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { TokensService } from '../tokens/tokens.service';

import { UserDocument } from '../users/users.schema';

import type { TUser } from '../utils/types/TUser';

@Injectable()
export class GoogleAuthService {
  oauthClient: Auth.OAuth2Client;
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly tokensService: TokensService,
  ) {
    this.oauthClient = new google.auth.OAuth2(
      this.configService.get<string>('GOOGLE_CLIENT_ID'),
      this.configService.get<string>('GOOGLE_CLIENT_SECRET'),
    );
  }

  async googleLogin(accessToken: string): Promise<TUser> {
    const { email } = await this.oauthClient.getTokenInfo(accessToken);

    const user = await this.usersService.getUserByEmail(email);
    if (user) {
      return this.handleRegisteredUser(user);
    }

    const newUser = await this.registerUser(accessToken, email);
    return newUser;
  }

  private async handleRegisteredUser(user: UserDocument): Promise<TUser> {
    const { _id, name, email, isRegisteredWithGoogle } = user;
    if (!isRegisteredWithGoogle) {
      throw new UnauthorizedException();
    }

    const tokens = await this.tokensService.generateTokens(_id, email);

    await this.usersService.updateUserById(_id, { refreshToken: tokens.refreshToken });

    return {
      _id,
      email,
      name,
      ...tokens,
    };
  }

  private async registerUser(accessToken: string, email: string): Promise<TUser> {
    const { name } = await this.getUserData(accessToken);

    const user = await this.usersService.createUserWithGoogle(email, name);

    return this.handleRegisteredUser(user);
  }

  private async getUserData(accessToken: string) {
    this.oauthClient.setCredentials({
      access_token: accessToken,
    });

    const { userinfo } = google.oauth2('v2');
    const { data } = await userinfo.get({
      auth: this.oauthClient,
    });

    return data;
  }
}
