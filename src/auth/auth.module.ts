import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/app/users/entities/user.entity';
import { TokenModule } from './token/token.module';
import { JwtStrategy } from './strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TokenModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
