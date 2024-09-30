import {
  Request
} from '@nestjs/common';
import { Usuario } from '@prisma/client';
import { AuthService } from './auth.service';
import { AuthDecorator } from './decorators/auth-decorator';
import { AuthDecoratorLogin } from './decorators/auth-decorator-login';
import { CurrentUser } from './decorators/current-user.decorator';
import { AuthRequest } from './models/AuthRequest';

@AuthDecorator()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @AuthDecoratorLogin()
  async login(@Request() req: AuthRequest, @CurrentUser() user: Usuario) {
    let token=  (await this.authService.login(req.user)).access_token;
    let id = user.usuario_id;
    let nome = user.name;
    let empresa_id = user.empresa_id;
    return{
      token, 
      id,
      nome,
      empresa_id
    }
  }
}