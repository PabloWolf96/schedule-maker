import { userDetailsStub, tokenStub } from '../stubs';

export const AuthServiceMock = jest.fn().mockReturnValue({
  signupLocal: jest.fn().mockResolvedValue(userDetailsStub()),
  signinLocal: jest.fn().mockResolvedValue(tokenStub()),
  logout: jest.fn(),
  refreshTokens: jest.fn().mockResolvedValue(tokenStub()),
});
