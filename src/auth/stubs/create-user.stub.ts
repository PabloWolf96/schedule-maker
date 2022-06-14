import { CreateUserDto } from '../dtos';
import { userStub } from './user.stub';
const { username, email, password, passwordConfirmation, firstName, lastName } =
  userStub();
export const createUserStub = (): CreateUserDto => {
  return {
    username,
    email,
    password,
    passwordConfirmation,
    firstName,
    lastName,
  };
};
