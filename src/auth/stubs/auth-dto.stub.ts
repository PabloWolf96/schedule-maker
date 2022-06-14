import { AuthDto } from '../dtos';
import { userStub } from './user.stub';
const { email, password } = userStub();
export const authDtoStub = (): AuthDto => {
  return {
    email,
    password,
  };
};
