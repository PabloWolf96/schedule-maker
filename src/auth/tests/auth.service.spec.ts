import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { UsersService } from '../../users/users.service';
import { AuthService } from '../auth.service';

jest.mock('../../users/users.service');
jest.mock('@nestjs/jwt');
jest.mock('@nestjs/config');
describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AuthService, UsersService, JwtService, ConfigService],
    }).compile();
    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });
  describe('AuthService is defined', () => {
    it('should be defined', () => {
      expect(authService).toBeDefined();
    });
  });
});
