import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UserEntity } from 'src/users/models/user.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signup')
  createUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    try {
      return this.authService.createUser(createUserDto);
    } catch (error) {
      console.log(error);
    }
  }
}
