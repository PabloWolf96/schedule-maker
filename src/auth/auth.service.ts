import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { UsersService } from '../users/users.service';
import * as argon from 'argon2';
@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  async createUser(user: CreateUserDto) {
    const passwordHash = await argon.hash(user.password);
    user.password = passwordHash;
    return this.usersService.add(user);
  }
  // ToDo: add password validation
}
