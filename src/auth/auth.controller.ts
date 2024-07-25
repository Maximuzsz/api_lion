import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/AuthRequest';
import { IsPublic } from './decorators/is-public.decorator';
import { AuthDecorator } from './decorators/auth-decorator';
import { AuthDecoratorLogin } from './decorators/auth-decorator-login';

@AuthDecorator()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @AuthDecoratorLogin()
  async login(@Request() req: AuthRequest) {
    return this.authService.login(req.user);
  }
}