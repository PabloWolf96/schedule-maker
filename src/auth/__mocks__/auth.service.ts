import { userDetailsStub, tokenStub } from '../stubs';

export const AuthService = jest.fn().mockReturnValue({
  signupLocal: jest.fn().mockResolvedValue(userDetailsStub()),
  signinLocal: jest.fn().mockResolvedValue(tokenStub()),
  logout: jest.fn(),
  refreshTokens: jest.fn().mockResolvedValue(tokenStub()),
});
