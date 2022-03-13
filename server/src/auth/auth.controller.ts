import { ObjectId } from 'mongoose';
import { Response, Request } from 'express';
import { Body, Controller, Get, Post, Req, Res, UseGuards, UsePipes } from '@nestjs/common';

import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';

import { CreateUserDto, LoginUserDto } from '../users/user.dto';

import { ValidationPipe } from '../utils/pipes/validation.pipe';
import { RefreshTokenGuard } from './guards/RefreshToken.guard';
import { ConfirmationTokenGuard } from 'src/auth/guards/ConfirmationToken.guard';

import { cookieConfig } from '../utils/constants';

import type { TUser } from '../utils/types/TUser';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}

  @Post('/registration')
  @UsePipes(ValidationPipe)
  async registration(@Body() dto: CreateUserDto): Promise<{ message: string }> {
    await this.authService.registration(dto);

    return { message: 'We have sent a confirmation link to your email address' };
  }

  @Get('/activation/:confirmationToken')
  @UseGuards(ConfirmationTokenGuard)
  async activate(@Req() { user }: Request, @Res() res: Response): Promise<void> {
    await this.authService.activate(user as ObjectId);
    res.redirect(`${this.configService.get<string>('CLIENT_URL')}/auth`);
  }

  @Post('/login')
  @UsePipes(ValidationPipe)
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: LoginUserDto,
  ): Promise<TUser> {
    const userData = await this.authService.login(dto);
    res.cookie('refreshToken', userData.refreshToken, cookieConfig);

    return userData;
  }

  @Post('/logout')
  @UseGuards(RefreshTokenGuard)
  async logout(
    @Req() { cookies }: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ message: string }> {
    await this.authService.logout(cookies.refreshToken);
    res.clearCookie('refreshToken');

    return { message: 'You have been successfully logged out' };
  }

  @Get('/refresh')
  @UseGuards(RefreshTokenGuard)
  async refreshToken(
    @Req() { cookies }: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<TUser> {
    const userData = await this.authService.refreshToken(cookies.refreshToken);
    res.cookie('refreshToken', userData.refreshToken, cookieConfig);

    return userData;
  }
}
