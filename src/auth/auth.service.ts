import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos';
import { UsersService } from '../users/users.service';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthDto } from './dtos';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  // Create User
  async signupLocal(user: CreateUserDto) {
    const passwordHash = await argon.hash(user.password);
    user.password = passwordHash;
    const newUser = await this.usersService.add(user);
    const tokens = await this.getTokens(newUser.id, newUser.email);
    await this.updateRefreshTokenHash(newUser.id, tokens.refresh_token);
    return {
      id: newUser.id,
      email: newUser.email,
      username: newUser.username,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      isActive: newUser.isActive,
      ...tokens,
    };
  }
  // Login
  async signinLocal(dto: AuthDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) {
      return null;
    }
    const isValid = await argon.verify(user.password, dto.password);
    if (!isValid) {
      return null;
    }
    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshTokenHash(user.id, tokens.refresh_token);
    return tokens;
  }
  // Logout
  async logout(id: string) {
    await this.usersService.updateRefreshTokenHashToNull(id);
  }

  // Refresh Tokens
  async refreshTokens(id: string, refreshToken: string) {
    const user = await this.usersService.findById(id);
    if (!user || !user.hashedRT) {
      return null;
    }
    const isValid = await argon.verify(user.hashedRT, refreshToken);
    if (!isValid) {
      return null;
    }
    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshTokenHash(user.id, tokens.refresh_token);
    return tokens;
  }
  // utilities
  private async getTokens(userId: string, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, email },
        {
          expiresIn: '15m',
          secret: this.configService.get<string>('JWT_SECRET') as string,
        },
      ),

      this.jwtService.signAsync(
        { sub: userId, email },
        {
          expiresIn: '7d',
          secret: this.configService.get<string>(
            'JWT_SECRET_REFRESH',
          ) as string,
        },
      ),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
  async updateRefreshTokenHash(userId: string, refreshTokenHash: string) {
    const hashedRT = await argon.hash(refreshTokenHash);
    return this.usersService.updateUser(userId, { hashedRT });
  }
}
