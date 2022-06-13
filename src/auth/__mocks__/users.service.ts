import { createUserStub } from '../stubs';

export const UsersService = jest.fn().mockReturnValue({
  findByEmail: jest.fn().mockResolvedValue(createUserStub()),
  findByUsername: jest.fn().mockResolvedValue(createUserStub()),
  add: jest.fn().mockResolvedValue(createUserStub()),
  updateRefreshTokenHash: jest.fn().mockResolvedValue(null),
  findById: jest.fn().mockResolvedValue(createUserStub()),
  updateRefreshTokenHashToNull: jest.fn().mockResolvedValue(null),
});
