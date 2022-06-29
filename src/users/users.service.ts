import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto } from '../auth/dtos';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  add(user: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        ...user,
      },
    });
  }
  updateUser(id: string, details: Partial<User>) {
    return this.prisma.user.update({
      where: { id },
      data: {
        ...details,
      },
    });
  }
  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
  updateRefreshTokenHashToNull(id: string) {
    return this.prisma.user.updateMany({
      where: { id, hashedRT: { not: null } },
      data: {
        hashedRT: null,
      },
    });
  }
  findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }
  findByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }
}
