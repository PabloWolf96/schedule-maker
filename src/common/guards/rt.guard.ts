import { AuthGuard } from '@nestjs/passport';
// refresh token guard
export class RtGuard extends AuthGuard('jwt-refresh') {
  constructor() {
    super();
  }
}
