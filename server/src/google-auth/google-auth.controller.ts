import { Response } from 'express';
import { Body, Controller, Post, Res, UsePipes } from '@nestjs/common';

import { GoogleAuthService } from './google-auth.service';
import { ValidationPipe } from '../utils/pipes/validation.pipe';

import { cookieConfig } from '../utils/constants';
import GoogleAccessTokenDto from './googleAccessToken.dto';

@Controller('google-auth')
export class GoogleAuthController {
  constructor(private readonly googleAuthService: GoogleAuthService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async googleLogin(
    @Res({ passthrough: true }) res: Response,
    @Body() { accessToken }: GoogleAccessTokenDto,
  ) {
    const userData = await this.googleAuthService.googleLogin(accessToken);
    res.cookie('refreshToken', userData.refreshToken, cookieConfig);

    return userData;
  }
}
