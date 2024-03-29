import { CreateUserDto } from '../dtos';
import { userStub } from './user.stub';
const { username, email, password, firstName, lastName } = userStub();
export const createUserStub = (): CreateUserDto => {
  return {
    username,
    email,
    password,
    firstName,
    lastName,
  };
};
