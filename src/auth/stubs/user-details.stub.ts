import { Tokens, UserDetails } from '../types';
import { userStub } from './user.stub';
const {
  id,
  email,
  username,
  isActive,
  firstName,
  lastName,
  refresh_token,
  access_token,
} = userStub();

export const userDetailsStub = (): UserDetails & Tokens => {
  return {
    id,
    email,
    username,
    isActive,
    firstName,
    lastName,
    refresh_token,
    access_token,
  };
};
