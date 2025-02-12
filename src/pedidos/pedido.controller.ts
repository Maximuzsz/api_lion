import { Body, Param } from '@nestjs/common';
import { PedidoCreateDecorator } from './dedcorators/pedido-create';
import { PedidoDecorator } from './dedcorators/pedido-decorator';
import { PedidoDeleteDecorator } from './dedcorators/pedido-delete';
import { PedidoFindAllDecorator } from './dedcorators/pedido-get';
import { PedidoFindByIdDecorator } from './dedcorators/pedido-getId';
import { PedidoUpdateDecorator } from './dedcorators/pedido-patch';
import { PedidoListarComProdutosDecorator } from './dedcorators/pedido-produto-get';
import { PedidoAddProdutosDecorator } from './dedcorators/pedido-put';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { PedidoService } from './pedido.service';
import { Pedido } from './schemas/pedido.schema';
import { PedidosUpdateDecorator } from './dedcorators/pedidos-put';

@PedidoDecorator()
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @PedidoCreateDecorator()
  async criarPedido(@Body() createPedidoDto: CreatePedidoDto) {
    return this.pedidoService.criarPedido(createPedidoDto);
  }

  @PedidoFindAllDecorator()
  async listarPedidos() {
    return this.pedidoService.listarPedidos();
  }

  @PedidoListarComProdutosDecorator()
  async listarPedidosComProdutos() {
    return this.pedidoService.buscarPedidosComProdutos();
  }

  @PedidoFindByIdDecorator()
  async buscarPedido(@Param('id') id: string) {
    return this.pedidoService.buscarPedido(id);
  }

  @PedidoUpdateDecorator()
  async atualizarPedido(
    @Param('id') id: string,
    @Body() updatePedidoDto: UpdatePedidoDto,
  ) {
    return this.pedidoService.atualizarPedido(id, updatePedidoDto);
  }

  @PedidoDeleteDecorator()
  async deletarPedido(@Param('id') id: string) {
    return this.pedidoService.deletarPedido(id);
  }

  @PedidoAddProdutosDecorator()
  async adicionarProdutosAoPedido(
    @Param('id') id: string,
    @Body()
    addProdutosDto: { produtos: { produtoId: string; quantidade: number }[] },
  ): Promise<Pedido> {
    return this.pedidoService.adicionarProdutosAoPedido(
      id,
      addProdutosDto.produtos,
    );
  }

  @PedidosUpdateDecorator()
  async updatePedido(
    @Param('id') id: string,
    @Body()
    pedidoAtualizado: {
      clienteId: string;
      produtos: { produtoId: string; quantidade: number }[];
      valorPago: number;
      status: string;
    },
  ) {
    return await this.pedidoService.atualizarPedidoCompleto(
      id,
      pedidoAtualizado,
    );
  }
}
