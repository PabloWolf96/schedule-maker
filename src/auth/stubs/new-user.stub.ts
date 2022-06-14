import { User } from '@prisma/client';
import { userStub } from './user.stub';
const {
  id,
  hashedPassword,
  email,
  username,
  hashedRT,
  createdAt,
  updatedAt,
  firstName,
  lastName,
  isActive,
} = userStub();
export const newUserStub = (): User => {
  return {
    id,
    password: hashedPassword,
    email,
    username,
    hashedRT,
    createdAt,
    updatedAt,
    lastName,
    firstName,
    isActive,
  };
};
