import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { throwException } from 'src/common/exceptions/error-handler';
import {
  INCORRECT_PASSWORD,
  LOGIN_IN_USE,
  SOMETHING_WENT_WRONG,
  USER_NOT_FOUND,
} from 'src/common/constants/users';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import 'dotenv/config';
import { ErrorsDb } from 'src/common/enums/errors-db.enum';
import {
  hashPassword,
  comparePassword,
} from 'src/common/helpers/hash-password';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      createUserDto.password = await hashPassword(createUserDto.password);
      const user: User = await this.userRepository.create({
        login: createUserDto.login,
        password: createUserDto.password,
        version: 1,
      });
      return await this.userRepository.save(user);
    } catch (e) {
      if (e.code === ErrorsDb.UNIQUE_LOGIN) {
        throwException(LOGIN_IN_USE, HttpStatus.BAD_REQUEST);
      } else {
        throwException(SOMETHING_WENT_WRONG, HttpStatus.BAD_REQUEST);
      }
    }
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user: User = await this.userRepository.findOneBy({ id });
    if (!user) throwException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const { oldPassword, newPassword } = updateUserDto;

    const user: User = await this.findOne(id);
    const isValidPassword = await comparePassword(
      oldPassword,
      user.password || '',
    );
    if (!user) {
      throwException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    } else if (!isValidPassword) {
      throwException(INCORRECT_PASSWORD, HttpStatus.FORBIDDEN);
    } else {
      user.password = await hashPassword(newPassword);
      return await this.userRepository.save(user);
    }
  }

  async remove(id: string): Promise<null> {
    const result: DeleteResult = await this.userRepository.delete({ id });
    if (result.affected) {
      return null;
    } else {
      throwException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }
}
