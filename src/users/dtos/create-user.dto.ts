import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Match } from '../decorators/match.decorator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  username: string;
  @IsString()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;
  @Match('password')
  passwordConfirmation: string;
  @IsEmail()
  email: string;
}
