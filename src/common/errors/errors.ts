import { CustomError } from '../classes';

export const DuplicateUsernameError = new CustomError(
  'Username already exists',
  'username_exists',
);
export const DuplicateEmailError = new CustomError(
  'Email already exists',
  'email_exists',
);
