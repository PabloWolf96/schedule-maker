import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { DuplicateEmailError } from '../../common/errors/errors';
import { DuplicateUsernameError } from '../../common/errors/errors';
import { UsersService } from '../../users/users.service';
import { AuthService } from '../auth.service';
import { UsersServiceMock, JwtServiceMock, ConfigServiceMock } from '../mocks';
import {
  createUserStub,
  authStub,
  newUserStub,
  tokenStub,
  userStub,
} from '../stubs';
import { UserDetails } from '../types';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;
  let configService: ConfigService;
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
    jwtService = module.get<JwtService>(JwtService);
    configService = module.get<ConfigService>(ConfigService);

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
      it('should call add', () => {
        expect(usersService.add).toHaveBeenCalled();
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
  describe('signinLocal', () => {
    describe('when it is called', () => {
      let response;
      let spy: jest.SpyInstance;
      beforeEach(async () => {
        spy = jest
          .spyOn(usersService, 'findByEmail')
          .mockResolvedValue(newUserStub());
        response = await authService.signinLocal(authStub());
      });
      afterEach(() => {
        spy.mockRestore();
      });
      it('calls usersService', () => {
        expect(usersService.findByEmail).toHaveBeenCalledWith(authStub().email);
      });
      it('returns access_token and refresh_token', () => {
        expect(response).toEqual(tokenStub());
      });
    });
    describe('when it is called with an invalid password', () => {
      it('returns null', async () => {
        const response = await authService.signinLocal({
          email: authStub().email,
          password: 'WRONGpassword!23',
        });
        expect(response).toBeNull();
      });
    });
    describe('when user does not exist', () => {
      let spy: jest.SpyInstance;
      beforeEach(() => {
        spy = jest.spyOn(usersService, 'findByEmail').mockResolvedValue(null);
      });
      afterEach(() => {
        spy.mockRestore();
      });
      it('should return null', async () => {
        const response = await authService.signinLocal(authStub());
        expect(response).toBeNull();
      });
    });
  });
  describe('logout', () => {
    describe('when it is called', () => {
      it('should call usersService', async () => {
        await authService.logout(userStub().id);
        expect(usersService.updateRefreshTokenHashToNull).toHaveBeenCalledWith(
          userStub().id,
        );
      });
    });
  });
  describe('refreshToken', () => {
    describe('when it is called', () => {
      let response;
      const id = userStub().id;
      const refreshToken = tokenStub().refresh_token;
      beforeEach(async () => {
        response = await authService.refreshTokens(id, refreshToken);
      });
      it('should call usersService', () => {
        expect(usersService.findById).toHaveBeenCalledWith(id);
      });
      it('should return tokens', () => {
        expect(response).toEqual(tokenStub());
      });
    });
    describe('when it is called with an invalid refresh token', () => {
      it('should return null', async () => {
        const response = await authService.refreshTokens(
          userStub().id,
          'invalid-refresh-token',
        );
        expect(response).toBeNull();
      });
    });
    describe('when the id is invalid', () => {
      let spy;
      const refreshToken = userStub().refresh_token;
      beforeEach(() => {
        spy = jest.spyOn(usersService, 'findById').mockResolvedValue(null);
      });
      afterEach(() => {
        spy.mockRestore();
      });
      it('should return null', async () => {
        const response = await authService.refreshTokens(
          'invalid-id',
          refreshToken,
        );
        expect(response).toBeNull();
      });
    });
  });
  describe('getTokens', () => {
    describe('when it is called', () => {
      let response;
      beforeEach(async () => {
        response = await authService['getTokens'](
          userStub().id,
          userStub().email,
        );
      });
      it('should call jwt service twice', () => {
        expect(jwtService.signAsync).toHaveBeenCalledTimes(2);
      });
      it('should call config service twice', () => {
        expect(configService.get).toHaveBeenCalledTimes(2);
      });
      it('should return tokens', () => {
        expect(response).toEqual(tokenStub());
      });
    });
  });
  describe('updateRefreshTokenHash', () => {
    describe('when it is called', () => {
      const id = userStub().id;
      const refreshToken = userStub().refresh_token;
      it('should call usersService', async () => {
        await authService.updateRefreshTokenHash(id, refreshToken);
        expect(usersService.updateUser).toHaveBeenCalled();
      });
    });
  });
});
