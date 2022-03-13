import { ObjectId } from 'mongoose';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

@Injectable()
export class ConfirmationTokenStrategy extends PassportStrategy(Strategy, 'jwt-ConfirmationToken') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: (req: Request) => req.params.confirmationToken,
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_CONFIRMATION_SECRET'),
    });
  }

  validate({ sub }: { sub: ObjectId }): ObjectId {
    return sub;
  }
}
