import {
  Body,
  Controller,
  Header,
  HttpCode,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from 'src/app/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { SuccessResponse } from './models/auth.model';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<SuccessResponse> {
    return await this.authService.signUp(createUserDto);
  }
}
