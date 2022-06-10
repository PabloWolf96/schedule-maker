export class CustomError extends Error {
  constructor(message: string, public code: string | number) {
    super(message);
  }
}
