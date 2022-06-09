import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Match } from '../../common/decorators';

export class CreateUserDto {
  @Transform(({ value }) => value.toLowerCase())
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
  @Transform(({ value }) => value.toLowerCase())
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  firstName: string;
  @IsNotEmpty()
  @IsString()
  lastName: string;
}
