import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { DuplicateEmailError } from '../../common/errors/errors';
import { DuplicateUsernameError } from '../../common/errors/errors';
import { UsersService } from '../../users/users.service';
import { AuthService } from '../auth.service';
import { ConfigServiceMock } from '../mocks/config-service.mock';
import { JwtServiceMock } from '../mocks/jwt-service.mock';
import { UsersServiceMock } from '../mocks/users-service.mock';
import { createUserStub } from '../stubs';
import { newUserStub } from '../stubs';
import { UserDetails } from '../types';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useClass: UsersServiceMock,
        },
        { provide: JwtService, useClass: JwtServiceMock },
        { provide: ConfigService, useClass: ConfigServiceMock },
      ],
    }).compile();
    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });
  describe('signupLocal', () => {
    describe('when it is called', () => {
      let response: UserDetails;
      let spy1: jest.SpyInstance;
      let spy2: jest.SpyInstance;

      beforeEach(async () => {
        spy1 = jest.spyOn(usersService, 'findByEmail').mockResolvedValue(null);
        spy2 = jest
          .spyOn(usersService, 'findByUsername')
          .mockResolvedValue(null);
        response = await authService.signupLocal(createUserStub());
      });
      afterEach(() => {
        spy1.mockRestore();
        spy2.mockRestore();
      });

      it('should call findByEmail', () => {
        expect(usersService.findByEmail).toHaveBeenCalledWith(
          createUserStub().email,
        );
      });
      it('should call findByUsername', () => {
        expect(usersService.findByUsername).toHaveBeenCalledWith(
          createUserStub().username,
        );
      });
      it('should return an object with id, email, username, firstName, lastName, isActive, access_token, refresh_token', () => {
        expect(response).toEqual({
          id: expect.any(String),
          email: expect.any(String),
          username: expect.any(String),
          firstName: expect.any(String),
          lastName: expect.any(String),
          isActive: expect.any(Boolean),
          access_token: expect.any(String),
          refresh_token: expect.any(String),
        });
      });
    });
    describe('when an email already exists', () => {
      let spy: jest.SpyInstance;
      beforeEach(async () => {
        spy = jest
          .spyOn(usersService, 'findByEmail')
          .mockResolvedValue(newUserStub());
      });
      afterEach(() => {
        spy.mockRestore();
      });
      it('it throws a duplicate email error', async () => {
        await expect(authService.signupLocal(createUserStub())).rejects.toThrow(
          DuplicateEmailError,
        );
      });
    });
    describe('when a username already exists', () => {
      let spy1: jest.SpyInstance;
      let spy2: jest.SpyInstance;
      beforeEach(async () => {
        spy1 = jest.spyOn(usersService, 'findByEmail').mockResolvedValue(null);
        spy2 = jest
          .spyOn(usersService, 'findByUsername')
          .mockResolvedValue(newUserStub());
      });
      afterEach(() => {
        spy1.mockRestore();
        spy2.mockRestore();
      });
      it('throws a duplicate username error', async () => {
        await expect(authService.signupLocal(createUserStub())).rejects.toThrow(
          DuplicateUsernameError,
        );
      });
    });
  });
});
