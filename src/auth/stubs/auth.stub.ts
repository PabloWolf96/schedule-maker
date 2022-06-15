import { AuthDto } from '../dtos';
import { userStub } from './user.stub';
const { email, password } = userStub();
export const authStub = (): AuthDto => {
  return {
    email,
    password,
  };
};
