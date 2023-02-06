import { HttpStatus, Injectable } from '@nestjs/common';
import { InMemoryDB } from 'src/database/in-memory.db';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { v4 as uuid_v4 } from 'uuid';
import { UserModel } from './models/user.model';
import { throwException } from 'src/common/exceptions/error-handler';
import { INCORRECT_PASSWORD, USER_NOT_FOUND } from 'src/common/constants/users';

@Injectable()
export class UsersService {
  constructor(private _db: InMemoryDB) {}

  create(createUserDto: CreateUserDto): UserModel {
    const date: number = Date.now();
    const newUser: UserModel = new User({
      id: uuid_v4(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: date,
      updatedAt: date,
    });
    this._db.users.push(newUser);
    return newUser;
  }

  findAll(): UserModel[] {
    return this._db.users;
  }

  findOne(id: string): UserModel {
    const user: UserModel | null = this._db.users.find(
      (user: UserModel) => user.id === id,
    );
    if (!user) throwException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto): UserModel {
    const { oldPassword, newPassword } = updateUserDto;
    const user: UserModel | null = this._db.users.find(
      (user: UserModel) => user.id === id,
    );
    if (!user) {
      throwException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    } else if (user.password !== oldPassword) {
      throwException(INCORRECT_PASSWORD, HttpStatus.FORBIDDEN);
    } else {
      user.version += 1;
      user.updatedAt = Date.now();
      user.password = newPassword;
      return user;
    }
  }

  remove(id: string): null {
    const userIndex: number = this._db.users.findIndex(
      (user: UserModel) => user.id === id,
    );
    if (userIndex < 0) {
      throwException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    } else {
      this._db.users.splice(userIndex, 1);
      return null;
    }
  }
}
