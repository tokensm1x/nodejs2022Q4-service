import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Header,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from 'src/app/users/dto/create-user.dto';
import { User } from 'src/app/users/entities/user.entity';
import { RefreshTokenValidationPipe } from 'src/pipes/validateRefreshToken.pipe';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { LoginResponse } from './models/auth.model';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.CREATED)
  async signUp(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<User> {
    return await this.authService.signUp(createUserDto);
  }

  @Post('login')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body(ValidationPipe) loginDto: LoginDto,
  ): Promise<LoginResponse> {
    return await this.authService.login(loginDto);
  }

  @Post('refresh')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Body(new RefreshTokenValidationPipe()) refreshDto: RefreshDto,
  ): Promise<LoginResponse> {
    return await this.authService.refresh(refreshDto);
  }
}
