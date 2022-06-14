import { Tokens } from '../types';
import { userStub } from './user.stub';
const { access_token, refresh_token } = userStub();

export const tokenStub = (): Tokens => {
  return {
    refresh_token,
    access_token,
  };
};
