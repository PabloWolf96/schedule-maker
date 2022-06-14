import { userStub } from '../stubs/user.stub';

export const UsersServiceMock = jest.fn().mockReturnValue({
  findByEmail: jest.fn().mockResolvedValue(null),
  findByUsername: jest.fn().mockResolvedValue(null),
  add: jest.fn().mockResolvedValue(userStub()),
  updateUser: jest.fn().mockResolvedValue(null),
  findById: jest.fn().mockResolvedValue(userStub()),
  updateRefreshTokenHashToNull: jest.fn().mockResolvedValue(null),
});
