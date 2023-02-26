import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { INVALID_PASSWORD } from 'src/common/constants/users';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  login: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z0-9]{3,30}/, {
    message: INVALID_PASSWORD,
  })
  password: string;
}
