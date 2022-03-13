import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from '../users/users.module';
import { TokensService } from './tokens.service';

@Module({
  providers: [TokensService],
  imports: [JwtModule.register({}), UsersModule],
  exports: [TokensService],
})
export class TokensModule {}
