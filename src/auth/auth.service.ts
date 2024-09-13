import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UnauthorizedError } from './errors/unauthorized.error';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { UsuarioService } from 'src/usuario/usuario.service';
import { UserPayload } from './models/UserPayload';
import { UserToken } from './models/UserToken';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usuarioService: UsuarioService,
  ) {}

  async login(user: Usuario): Promise<UserToken> {
    const payload: UserPayload = {
      sub: user.usuario_id,
      userName: user.userName,
      name: user.name,
    };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }

  async validateUser(userName: string, password: string): Promise<Usuario> {
    const user = await this.usuarioService.findByEmail(userName);

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        return {
          ...user,
          password: undefined,
        };
      }
    }

    throw new UnauthorizedError(
      'user or password provided is incorrect.',
    );
  }
}