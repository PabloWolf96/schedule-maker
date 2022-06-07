import { Body, Controller, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signup')
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      return this.authService.createUser(createUserDto);
    } catch (error) {
      console.log(error);
    }
  }
}
