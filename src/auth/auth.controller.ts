import { Body, Controller, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { UserDto } from '../users/dtos/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Serialize(UserDto)
  @Post('signup')
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      return this.authService.createUser(createUserDto);
    } catch (error) {
      console.log(error);
    }
  }
}
