import { HttpStatus, Injectable } from '@nestjs/common';
import { InMemoryDB } from 'src/database/in-memory.db';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { v4 as uuid_v4 } from 'uuid';
import { UserModel } from './models/user.model';
import { throwException } from 'src/common/exceptions/error-handler';
import { INCORRECT_PASSWORD, USER_NOT_FOUND } from 'src/common/constants/users';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    private _db: InMemoryDB,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user: User = await this.userRepository.save({
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
    });
    return new User(user);
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
    if (!user) {
      throwException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    } else if (user.password !== oldPassword) {
      throwException(INCORRECT_PASSWORD, HttpStatus.FORBIDDEN);
    } else {
      user.password = newPassword;
      return this.userRepository.save(user);
    }
  }

  async remove(id: string): Promise<null> {
    let result: DeleteResult = await this.userRepository.delete({ id });
    if (result.affected) {
      return null;
    } else {
      throwException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }
}
