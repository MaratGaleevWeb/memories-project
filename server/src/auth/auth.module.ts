import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MailModule } from '../mail/mail.module';
import { TokensModule } from '../tokens/tokens.module';
import { UsersModule } from '../users/users.module';

import { AuthController } from './auth.controller';

import { AuthService } from './auth.service';

import { AccessTokenStrategy } from './strategies/AccessToken.strategy';
import { RefreshTokenStrategy } from './strategies/RefreshToken.strategy';
import { ConfirmationTokenStrategy } from './strategies/ConfirmationToken.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy, ConfirmationTokenStrategy],
  imports: [UsersModule, MailModule, TokensModule, PassportModule, JwtModule.register({})],
  exports: [AuthService],
})
export class AuthModule {}
