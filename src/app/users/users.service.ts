import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InMemoryDB } from 'src/database/in-memory.db';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { v4 as uuid_v4 } from 'uuid';
import { UserModel } from './models/user.model';

@Injectable()
export class UsersService {
  constructor(private _db: InMemoryDB) {}

  create(createUserDto: CreateUserDto): UserModel {
    const date: number = Date.now();
    const newUser: UserModel = new User({
      id: uuid_v4(),
      login: createUserDto.login,
      password: createUserDto.login,
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
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto): UserModel {
    const { oldPassword, newPassword } = updateUserDto;
    const user: UserModel | null = this._db.users.find(
      (user: UserModel) => user.id === id,
    );
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    } else if (user.password !== oldPassword) {
      throw new HttpException('Incorrect old password', HttpStatus.FORBIDDEN);
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
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    } else {
      this._db.users.splice(userIndex, 1);
      return null;
    }
  }
}
