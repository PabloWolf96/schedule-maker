import { ConflictException, ForbiddenException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  DuplicateEmailError,
  DuplicateUsernameError,
} from '../../common/errors/errors';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { createUserStub, tokenStub, userDetailsStub } from '../stubs';
import { authDtoStub } from '../stubs/auth-dto.stub';
import { Tokens, UserDetails } from '../types';
jest.mock('../auth.service');
describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();
    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });
  describe('signupLocal', () => {
    describe('when sinupLocal is called', () => {
      let signupResponse: UserDetails & Tokens;
      beforeEach(async () => {
        signupResponse = await authController.signupLocal(createUserStub());
      });
      it('should call authService', () => {
        expect(authService.signupLocal).toHaveBeenCalledWith(createUserStub());
      });
      it('should return userDetails and tokens', () => {
        expect(signupResponse).toEqual(userDetailsStub());
      });
    });
    describe('when an email  already exists ', () => {
      let mockedFn: jest.SpyInstance;
      beforeEach(async () => {
        mockedFn = jest
          .spyOn(authService, 'signupLocal')
          .mockRejectedValue(DuplicateEmailError);
      });
      afterEach(() => {
        mockedFn.mockRestore();
      });
      it('it should throw a conflict exception', async () => {
        await expect(
          authController.signupLocal(createUserStub()),
        ).rejects.toThrow(new ConflictException('Email already exists'));
      });
    });
    describe('when username  already exists ', () => {
      let mockedFn: jest.SpyInstance;
      beforeEach(async () => {
        mockedFn = jest
          .spyOn(authService, 'signupLocal')
          .mockRejectedValue(DuplicateUsernameError);
      });
      afterEach(() => {
        mockedFn.mockRestore();
      });
      it('it should throw a conflict exception', async () => {
        await expect(
          authController.signupLocal(createUserStub()),
        ).rejects.toThrow(new ConflictException('Username already exists'));
      });
    });
  });
  describe('signinLocal', () => {
    describe('when signinLocal is called', () => {
      let signinResponse: Tokens;
      beforeEach(async () => {
        signinResponse = await authController.signinLocal(authDtoStub());
      });
      it('should call authService', () => {
        expect(authService.signinLocal).toHaveBeenCalledWith(authDtoStub());
      });
      it('should return tokens', () => {
        expect(signinResponse).toEqual(tokenStub());
      });
    });
    describe('when details are invalid', () => {
      let mockedFn: jest.SpyInstance;
      beforeEach(() => {
        mockedFn = jest
          .spyOn(authService, 'signinLocal')
          .mockResolvedValue(null);
      });
      afterEach(() => {
        mockedFn.mockRestore();
      });
      it('throws a forbidden exception', async () => {
        await expect(authController.signinLocal(authDtoStub())).rejects.toThrow(
          ForbiddenException,
        );
      });
    });
  });
  describe('refreshTokens', () => {
    describe('when refreshTokens is called', () => {
      let response: Tokens;
      const id = userDetailsStub().id;
      const refresh_token = tokenStub().refresh_token;
      beforeEach(async () => {
        response = await authController.refreshTokens(id, refresh_token);
      });
      it('should call authService', () => {
        expect(authService.refreshTokens).toHaveBeenCalledWith(
          id,
          refresh_token,
        );
      });
      it('should return tokens', () => {
        expect(response).toEqual(tokenStub());
      });
    });
    describe('when refresh token is invalid', () => {
      let mockedFn: jest.SpyInstance;
      beforeEach(() => {
        mockedFn = jest
          .spyOn(authService, 'refreshTokens')
          .mockResolvedValue(null);
      });
      afterEach(() => {
        mockedFn.mockRestore();
      });
      it('throws a forbidden exception', async () => {
        await expect(
          authController.refreshTokens(userDetailsStub().id, 'invalid'),
        ).rejects.toThrow(ForbiddenException);
      });
    });
  });
  describe('logout', () => {
    describe('when logout is called', () => {
      it('should call authService', async () => {
        await authController.logout(userDetailsStub().id);
        expect(authService.logout).toHaveBeenCalledWith(userDetailsStub().id);
      });
    });
  });
});
