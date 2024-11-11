import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComprasClientesService } from './compras-clientes.service';
import { CreateComprasClienteDto } from './dto/create-compras-cliente.dto';
import { UpdateComprasClienteDto } from './dto/update-compras-cliente.dto';
import { CompraDecorator } from './decorators/compras-decorator';
import { ComprasCreateDecorator } from './decorators/compras-decorator-create';
import { ComprasDecoratorUpdate } from './decorators/produto-decorator-update';

@CompraDecorator()
export class ComprasClientesController {
  constructor(private readonly comprasClientesService: ComprasClientesService) {}

  @ComprasCreateDecorator()
  create(
    @Body('clienteId') clienteId: string,
    @Body('itens') itens: { produto_Id: string; requisitor_nome: string; quantidade: number;  }[]
  ){
    return this.comprasClientesService.create(clienteId, itens)
  }

  @Get()
  getAll(){
    return this.comprasClientesService.getAll;
  }

  @Get('/:cliente_id')
  getContasClientes(cliente_id: string){
    return this.getContasClientes(cliente_id)
  }


}
