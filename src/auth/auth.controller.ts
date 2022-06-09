import {
  Body,
  ConflictException,
  Controller,
  ForbiddenException,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RtGuard } from '../common/guards';
import { CurrentUser } from '../common/decorators';
import { CreateUserDto } from './dtos';
import { AuthService } from './auth.service';
import { AuthDto } from './dtos';
import { Tokens, UserDetails } from './types';
import { Public } from '../common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  signupLocal(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserDetails & Tokens> {
    try {
      return this.authService.signupLocal(createUserDto);
    } catch (error) {
      if (error.code === 'P2002') {
        console.error(error);
        throw new ConflictException('User already exists');
      }
    }
  }
  @Public()
  @Post('local/signin')
  @HttpCode(HttpStatus.OK)
  async signinLocal(@Body() dto: AuthDto): Promise<Tokens> {
    const tokens = await this.authService.signinLocal(dto);
    if (!tokens) {
      throw new ForbiddenException('invalid credentials');
    }
    return tokens;
  }
  @Public()
  @UseGuards(RtGuard)
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @CurrentUser('sub') id: string,
    @CurrentUser('refreshToken') refreshToken: string,
  ) {
    const tokens = await this.authService.refreshTokens(id, refreshToken);
    if (!tokens) {
      throw new ForbiddenException('invalid credentials');
    }
    return tokens;
  }
  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  logout(@CurrentUser('sub') id: string) {
    return this.authService.logout(id);
  }
}
