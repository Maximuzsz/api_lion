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
import { CurrentUser } from './decorators/current-user.decorator';
import { Usuario } from '@prisma/client';

@AuthDecorator()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @AuthDecoratorLogin()
  async login(@Request() req: AuthRequest, @CurrentUser() user: Usuario) {
    let token=  (await this.authService.login(req.user)).access_token;
    let id = user.usuario_id;
    let nome = user.name;
    return{
      token, 
      id,
      nome
    }
  }
}