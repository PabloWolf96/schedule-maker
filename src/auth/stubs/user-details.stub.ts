import { Tokens, UserDetails } from '../types';
import { tokenStub } from './tokens.stub';

export const userDetailsStub = (): UserDetails & Tokens => {
  return {
    id: 'd4edd3e2-6989-4767-a3c8-002e30fe36a6',
    email: 'ikhena.owen@gmail.com',
    username: 'pablowolf',
    isActive: false,
    firstName: 'Owen',
    lastName: 'Ikhena',
    ...tokenStub(),
  };
};
