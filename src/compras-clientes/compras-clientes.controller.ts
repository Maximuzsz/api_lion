import { Body, Get, Logger, Param, Post, Res } from '@nestjs/common';
import { ComprasClientesService } from './compras-clientes.service';
import { CompraDecorator } from './decorators/compras-decorator';
import { ComprasCreateDecorator } from './decorators/compras-decorator-create';
import { ComprasDecoratorGetAll } from './decorators/compras-decorator-get';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { Response, Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

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

  aberturaCOnta(@Param('cliente_Id') cliente_Id: string, @CurrentUser() user: Usuario) {
    return this.comprasClientesService.createNewConta(cliente_Id, user.usuario_id)
  }

  @ComprasDecoratorGetAll()
  getAll(){
    return this.comprasClientesService.getAll();
  }

  @Get(':cliente_id')
  async getContasClientes(@Param('cliente_id') cliente_id: string){
    return await this.comprasClientesService.getContasCliente(cliente_id)
  }

  @Get('/itens/:compra_id')
  async getItensCompras(@Param('compra_id') compra_id: string){
    return await this.comprasClientesService.getCompra(compra_id)
  }

  @Post('gerarPDf/:compraId')
  async geraPdf(@Param('compra_id') compra_id: string, @Res() res: Response, @CurrentUser() user: Usuario){
    const file_stream = await this.comprasClientesService.gerarPdfConta(compra_id, user.empresa_id);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=compra_cliente.pdf");

    // Retorna o PDF para o cliente
    res.send(Buffer.from(file_stream));
  }


}
