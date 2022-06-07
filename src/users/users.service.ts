import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  add(createUserDto: CreateUserDto) {
    const { passwordConfirmation, ...user } = createUserDto;
    return this.prisma.user.create({
      data: {
        ...user,
      },
    });
  }
}
