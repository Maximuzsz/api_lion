import { Body, Get, Param } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteDecorator } from './decorators/cliente-decorator';
import { ClienteCreateDecorator } from './decorators/cliente-decorator-create';
import { ClienteDecoratorUpdate } from './decorators/cliente-decorator-update';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@ClienteDecorator()
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}
  @ClienteCreateDecorator()
  create(cliente:CreateClienteDto) {
    return this.clienteService.create(cliente)
  }

  @Get()
  getAll(){
    return this.clienteService.getAll()
  }

  @ClienteDecoratorUpdate()
  update(@Param('cliente_id') cliente_id: string, @Body() cliente: UpdateClienteDto){
    return this.clienteService.update(cliente_id,cliente)
  }


}
