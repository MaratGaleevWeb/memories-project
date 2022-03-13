import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class ConfirmationTokenGuard extends AuthGuard('jwt-ConfirmationToken') {}
