import { Body } from '@nestjs/common';
import { UsuarioDecorator } from './decorators/user-decorator';
import { UsuarioCreateDecorator } from './decorators/user-decorator-create';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UsuarioService } from './usuario.service';


@UsuarioDecorator()
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}
  @UsuarioCreateDecorator()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }
}
