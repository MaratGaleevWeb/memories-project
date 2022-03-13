import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-RefreshToken') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: (req: Request) => req.cookies.refreshToken,
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_REFRESH_SECRET'),
    });
  }

  validate(payload: { sub: string; email: string }): { userId: string; username: string } {
    return { userId: payload.sub, username: payload.email };
  }
}
