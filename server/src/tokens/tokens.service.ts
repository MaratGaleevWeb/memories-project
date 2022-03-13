import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongoose';

import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

import type { UserDocument } from '../users/users.schema';
import type { TTokens } from '../utils/types/TTokens';

@Injectable()
export class TokensService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async createConfirmationToken(userId: ObjectId): Promise<string> {
    const confirmationToken = await this.jwtService.signAsync(
      { sub: userId },
      {
        secret: this.configService.get<string>('JWT_CONFIRMATION_SECRET'),
        expiresIn: '7d',
      },
    );
    return confirmationToken;
  }

  async refreshTokens(user: UserDocument): Promise<TTokens> {
    const tokens = await this.generateTokens(user._id, user.email);

    await this.usersService.updateUserById(user._id, { refreshToken: tokens.refreshToken });

    return tokens;
  }

  async generateTokens(userId: ObjectId, email: string): Promise<TTokens> {
    const jwtPayload = { sub: userId, email };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: '1d',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: '30d',
      }),
    ]);
    return { accessToken, refreshToken };
  }
}
