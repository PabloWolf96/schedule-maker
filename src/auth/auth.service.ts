import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  async createUser(user: CreateUserDto) {
    const passwordHash = await bcrypt.hash(user.password, 10);
    user.password = passwordHash;
    return this.usersService.add(user);
  }
}
