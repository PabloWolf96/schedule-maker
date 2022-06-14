import { userDetailsStub } from './user-details.stub';
const { email, firstName, id, isActive, lastName, username } =
  userDetailsStub();
export const userStub = () => {
  return {
    id,
    email,
    username,
    password: 'password',
    firstName,
    lastName,
    isActive,
    createdAt: new Date(),
    updatedAt: new Date(),
    hashedRT: null,
  };
};
