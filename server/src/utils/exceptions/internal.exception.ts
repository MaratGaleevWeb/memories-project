import { InternalServerErrorException } from '@nestjs/common';

export class InternalException extends InternalServerErrorException {
  constructor() {
    super('Unexpected error occurred');
  }
}
