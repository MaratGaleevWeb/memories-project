import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersService } from './users.service';
import { User, UserSchema } from './users.schema';

@Module({
  providers: [UsersService],
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  exports: [UsersService],
})
export class UsersModule {}
