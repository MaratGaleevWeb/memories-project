import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata): Promise<any> {
    const obj = plainToClass(metatype, value);
    const errors = await validate(obj);

    if (errors.length) {
      const messages = errors.reduce((prev, { property, constraints }) => {
        prev[property] = Object.values(constraints)[0];
        return prev;
      }, {});
      throw new BadRequestException(messages);
    }

    return value;
  }
}
