import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/app/users/entities/user.entity';
import 'dotenv/config';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async generateAccessToken(user: User): Promise<string> {
    return this.jwtService.sign(
      { id: user.id, login: user.login },
      {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: process.env.TOKEN_EXPIRE_TIME,
      },
    );
  }

  async generateRefreshToken(user: User): Promise<string> {
    return this.jwtService.sign(
      { id: user.id, login: user.login },
      {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
      },
    );
  }

  async verifyRefreshToken(token: string): Promise<any> {
    try {
      const user = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
      });
      return user;
    } catch (e) {
      return null;
    }
  }
}
