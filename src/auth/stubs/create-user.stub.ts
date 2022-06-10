import { CreateUserDto } from '../dtos';
import { userDetailsStub } from './user-details.stub';
const { access_token, refresh_token, ...createUser } = userDetailsStub();
export const createUserStub = (): CreateUserDto => {
  return {
    ...createUser,
    password: 'password',
    passwordConfirmation: 'password',
  };
};
