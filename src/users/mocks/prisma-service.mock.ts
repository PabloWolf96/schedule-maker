import { User } from '@prisma/client';
import { newUserStub } from '../../auth/stubs';

export const PrismaServiceMock = jest.fn().mockReturnValue({
  user: jest.fn().mockReturnValue({
    add: jest.fn().mockResolvedValue(newUserStub()),
    updateUser: jest
      .fn()
      .mockImplementation((id: string, details: Partial<User>) => {
        return Object.assign(newUserStub(), details);
      }),
    findByEmail: jest.fn().mockResolvedValue(newUserStub()),
    findByUsername: jest.fn().mockResolvedValue(newUserStub()),
    findById: jest.fn().mockResolvedValue(newUserStub()),
    updateRefreshTokenHashToNull: jest
      .fn()
      .mockResolvedValue({ ...newUserStub(), hashedRt: null }),
  }),
});
