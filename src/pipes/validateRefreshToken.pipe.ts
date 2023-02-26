import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpStatus,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { throwException } from 'src/common/exceptions/error-handler';
import { REFRESH_IS_REQUIRED } from 'src/common/constants/users';

@Injectable()
export class RefreshTokenValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throwException(REFRESH_IS_REQUIRED, HttpStatus.UNAUTHORIZED);
    }
    return value;
  }

  private toValidate(metatype: any): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
