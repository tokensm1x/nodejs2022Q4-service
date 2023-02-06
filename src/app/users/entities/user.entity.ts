import { Exclude } from 'class-transformer';
import { UserModel } from '../models/user.model';

export class User {
  id: string;

  login: string;

  @Exclude()
  password: string;

  version: number;

  createdAt: number;

  updatedAt: number;

  constructor(user: UserModel) {
    Object.assign(this, user);
  }
}
