import { ObjectId } from 'mongoose';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { hash, verify } from 'argon2';

import { UsersService } from '../users/users.service';
import { TokensService } from '../tokens/tokens.service';
import { MailService } from '../mail/mail.service';

import { CreateUserDto, LoginUserDto } from '../users/user.dto';
import { UserDocument } from '../users/users.schema';

import type { TUser } from '../utils/types/TUser';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokensService: TokensService,
    private readonly mailService: MailService,
  ) {}

  async registration(dto: CreateUserDto): Promise<void> {
    await this.validateRegistrationCredentails(dto);

    const hashedPassword = await hash(dto.password);
    const { _id, email } = await this.usersService.createUser({
      ...dto,
      password: hashedPassword,
    });
    const confirmationToken = await this.tokensService.createConfirmationToken(_id);
    this.mailService.sendActivationMail(email, confirmationToken);
  }

  async activate(userId: ObjectId): Promise<void> {
    await this.usersService.updateUserById(userId, { isActivatedByLink: true });
  }

  async login({ email: dtoEmail, password }: LoginUserDto): Promise<TUser> {
    const user = await this.validateLoginCredentials(dtoEmail, password);
    const { _id, name, email } = user;

    const tokens = await this.tokensService.generateTokens(_id, email);

    await this.usersService.updateUserById(_id, { refreshToken: tokens.refreshToken });

    return { _id, name, email, ...tokens };
  }

  async logout(refreshToken: string): Promise<void> {
    await this.usersService.updateUserByRefreshToken(refreshToken, { refreshToken: undefined });
  }

  async refreshToken(refreshToken: string): Promise<TUser> {
    const user = await this.usersService.getUserByRefreshToken(refreshToken);
    const { _id, name, email } = user;
    const tokens = await this.tokensService.refreshTokens(user);

    return { _id, name, email, ...tokens };
  }

  private async validateRegistrationCredentails(dto: CreateUserDto): Promise<void> {
    const { email, password, confirmPassword } = dto;
    if (password !== confirmPassword) {
      throw new UnauthorizedException({ password: 'Passwords do not match' });
    }

    const IsInDataBase = await this.usersService.getUserByEmail(email);
    if (IsInDataBase) {
      throw new UnauthorizedException({ email: 'User with this email already exists' });
    }
  }

  private async validateLoginCredentials(email: string, password: string): Promise<UserDocument> {
    const user = await this.usersService.getUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException({ email: 'User with this email does not exist' });
    }

    const isPasswordSame = await verify(user.password, password);
    if (!isPasswordSame) {
      throw new UnauthorizedException({ password: 'Wrong password' });
    }

    if (!user.isActivatedByLink) {
      throw new UnauthorizedException({ email: 'Email is not confirmed' });
    }
    return user;
  }
}
