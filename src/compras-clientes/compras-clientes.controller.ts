import { Body, Get, Logger, Param } from '@nestjs/common';
import { ComprasClientesService } from './compras-clientes.service';
import { CompraDecorator } from './decorators/compras-decorator';
import { ComprasCreateDecorator } from './decorators/compras-decorator-create';
import { ComprasDecoratorGetAll } from './decorators/compras-decorator-get';

@CompraDecorator()
export class ComprasClientesController {
  constructor(private readonly comprasClientesService: ComprasClientesService) {}
  private readonly logger = new Logger(ComprasClientesController.name);

  @ComprasCreateDecorator()
  create(
    @Body('clienteId') clienteId: string,
    @Body('itens') itens: { produto_Id: string; requisitor_nome: string; quantidade: number;  }[]
  ){
    return this.comprasClientesService.create(clienteId, itens)
  }

  @ComprasDecoratorGetAll()
  getAll(){
    return this.comprasClientesService.getAll();
  }

  @Get(':cliente_id')
  async getContasClientes(@Param('cliente_id') cliente_id: string){
    return await this.comprasClientesService.getContasCliente(cliente_id)
  }


}
