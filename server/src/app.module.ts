import { resolve } from 'path';
import * as Joi from '@hapi/joi';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';
import { AuthModule } from './auth/auth.module';
import { TokensModule } from './tokens/tokens.module';
import { GoogleAuthModule } from './google-auth/google-auth.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        API_URL: Joi.string().required(),
        CLIENT_URL: Joi.string().required(),
        PORT: Joi.number().required(),
        JWT_ACCESS_SECRET: Joi.string().required(),
        JWT_REFRESH_SECRET: Joi.string().required(),
        JWT_CONFIRMATION_SECRET: Joi.string().required(),
        GOOGLE_CLIENT_ID: Joi.string().required(),
        GOOGLE_CLIENT_SECRET: Joi.string().required(),
        DB_URL: Joi.string().required(),
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.number().required(),
        SMTP_HOST: Joi.string().required(),
        SMTP_PORT: Joi.number().required(),
        SMTP_USER: Joi.string().required(),
        SMTP_PASSWORD: Joi.string().required(),
      }),
    }),
    ServeStaticModule.forRoot({ rootPath: resolve(__dirname, 'static') }),
    MongooseModule.forRoot(process.env.DB_URL),
    UsersModule,
    PostsModule,
    FilesModule,
    AuthModule,
    TokensModule,
    GoogleAuthModule,
    MailModule,
  ],
})
export class AppModule {}
