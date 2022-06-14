import { userDetailsStub } from './user-details.stub';
const { access_token, refresh_token, ...createUser } = userDetailsStub();
export const createUserStub = () => {
  return {
    ...createUser,
    password: 'password',
    passwordConfirmation: 'password',
  };
};
