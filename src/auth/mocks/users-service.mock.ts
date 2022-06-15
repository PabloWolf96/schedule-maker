import { newUserStub } from '../stubs/new-user.stub';

export const UsersServiceMock = jest.fn().mockReturnValue({
  findByEmail: jest.fn().mockResolvedValue(newUserStub()),
  findByUsername: jest.fn().mockResolvedValue(newUserStub()),
  add: jest.fn().mockResolvedValue(newUserStub()),
  updateUser: jest.fn().mockResolvedValue(null),
  findById: jest.fn().mockResolvedValue(newUserStub()),
  updateRefreshTokenHashToNull: jest.fn().mockResolvedValue(null),
});
