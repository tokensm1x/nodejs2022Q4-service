import { HttpException } from '@nestjs/common';

export function throwException(message, code) {
  throw new HttpException(message, code);
}
