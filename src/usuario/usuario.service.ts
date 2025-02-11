import { Injectable } from '@nestjs/common';
import { Usuario } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUsuarioDto): Promise<Usuario> {
    const data = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };

    const createUser = await this.prisma.usuario.create({ data });
    return {
      ...createUser,
      password: undefined,
    };
  }

  findByEmail(userName: string) {
    return this.prisma.usuario.findUnique({ where: { userName } });
  }
}
