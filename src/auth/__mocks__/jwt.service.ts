export class JwtService {
  signAsync(payload: any, options: any): Promise<string> {
    if (options.secret == 'JWT_SECRET') {
      return Promise.resolve('access_token');
    }
    if (options.secret == 'JWT_SECRET_REFRESH') {
      return Promise.resolve('refresh_token');
    }
    return Promise.resolve('secret');
  }
}
