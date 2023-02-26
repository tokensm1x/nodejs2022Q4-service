import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/app/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/app/users/dto/create-user.dto';
import { ErrorsDb } from 'src/common/enums/errors-db.enum';
import { throwException } from 'src/common/exceptions/error-handler';
import {
  FAILED_LOGIN,
  INVALID_REFRESH,
  LOGIN_IN_USE,
  SOMETHING_WENT_WRONG,
} from 'src/common/constants/users';
import { LoginResponse } from './models/auth.model';
import {
  hashPassword,
  comparePassword,
} from 'src/common/helpers/hash-password';
import { LoginDto } from './dto/login.dto';
import { TokenService } from './token/token.service';
import { RefreshDto } from './dto/refresh.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly tokenService: TokenService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    try {
      createUserDto.password = await hashPassword(createUserDto.password);
      const user: User = await this.userRepository.create({
        login: createUserDto.login,
        password: createUserDto.password,
        version: 1,
      });
      const newUser = await this.userRepository.save(user);
      return newUser;
    } catch (e) {
      if (e.code === ErrorsDb.UNIQUE_LOGIN) {
        throwException(LOGIN_IN_USE, HttpStatus.BAD_REQUEST);
      } else {
        throwException(SOMETHING_WENT_WRONG, HttpStatus.BAD_REQUEST);
      }
    }
  }

  async login(loginDto: LoginDto): Promise<LoginResponse> {
    const { login, password } = loginDto;
    const user: User = await this.userRepository.findOneBy({ login });
    if (!user) throwException(FAILED_LOGIN, HttpStatus.FORBIDDEN);
    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) throwException(FAILED_LOGIN, HttpStatus.FORBIDDEN);
    const accessToken = await this.tokenService.generateAccessToken(user);
    const refreshToken = await this.tokenService.generateRefreshToken(user);
    await this.updateRefreshToken(user, refreshToken);
    return {
      accessToken,
      refreshToken,
    };
  }

  async refresh(refreshDto: RefreshDto): Promise<LoginResponse> {
    const { refreshToken } = refreshDto;
    const user = await this.tokenService.verifyRefreshToken(refreshToken);
    const userByTokenAndId = await this.userRepository.findOneBy({
      refreshToken,
      id: user?.id,
    });
    if (!user || !userByTokenAndId)
      throwException(INVALID_REFRESH, HttpStatus.FORBIDDEN);
    const accessToken = await this.tokenService.generateAccessToken(user);
    const newRefreshToken = await this.tokenService.generateRefreshToken(user);
    await this.updateRefreshToken(user, newRefreshToken);
    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  }

  async updateRefreshToken(user: User, refreshToken: string): Promise<void> {
    user.refreshToken = refreshToken;
    await this.userRepository.save(user);
  }
}
