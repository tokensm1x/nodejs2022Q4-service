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
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LoginResponse, SuccessResponse } from './models/auth.model';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.CREATED)
  async signUp(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<SuccessResponse> {
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
}
