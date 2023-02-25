import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/app/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/app/users/dto/create-user.dto';
import { ErrorsDb } from 'src/common/enums/errors-db.enum';
import { throwException } from 'src/common/exceptions/error-handler';
import {
  LOGIN_IN_USE,
  REGISTERED_SUCCESSFULLY,
  SOMETHING_WENT_WRONG,
} from 'src/common/constants/users';
import { SuccessResponse } from './models/auth.model';
import { hashPassword } from 'src/common/helpers/hash-password';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<SuccessResponse> {
    try {
      createUserDto.password = await hashPassword(createUserDto.password);
      const user: User = await this.userRepository.create({
        login: createUserDto.login,
        password: createUserDto.password,
        version: 1,
      });
      await this.userRepository.save(user);
      return {
        message: REGISTERED_SUCCESSFULLY,
      };
    } catch (e) {
      if (e.code === ErrorsDb.UNIQUE_LOGIN) {
        throwException(LOGIN_IN_USE, HttpStatus.BAD_REQUEST);
      } else {
        throwException(SOMETHING_WENT_WRONG, HttpStatus.BAD_REQUEST);
      }
    }
  }
}
