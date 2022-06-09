import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Payload } from '../../auth/types';

export const CurrentUser = createParamDecorator(
  (
    data: keyof Payload | 'refreshToken' | undefined,
    context: ExecutionContext,
  ) => {
    const request = context.switchToHttp().getRequest();
    if (!data) {
      return request.user;
    }
    return request.user[data];
  },
);
