import { Module } from '@nestjs/common';

import { TokensModule } from '../tokens/tokens.module';
import { UsersModule } from '../users/users.module';
import { GoogleAuthController } from './google-auth.controller';
import { GoogleAuthService } from './google-auth.service';

@Module({
  controllers: [GoogleAuthController],
  providers: [GoogleAuthService],
  imports: [UsersModule, TokensModule],
})
export class GoogleAuthModule {}
