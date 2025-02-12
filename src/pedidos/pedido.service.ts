import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pedido, PedidoDocument } from './schemas/pedido.schema';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PedidoService {
  constructor(
    @InjectModel(Pedido.name) private pedidoModel: Model<PedidoDocument>,
    private readonly prisma: PrismaService,
  ) {}

  async criarPedido(createPedidoDto: CreatePedidoDto): Promise<Pedido> {
    const pedido = new this.pedidoModel(createPedidoDto);
    return pedido.save();
  }

  async listarPedidos(): Promise<Pedido[]> {
    return this.pedidoModel.find().exec();
  }

  async buscarPedido(clienteId: string): Promise<any[]> {
    const pedidos = await this.pedidoModel.find({ clienteId }).exec();

    // Coletar todos os produtoId únicos dos pedidos encontrados
    const produtoIds = [
      ...new Set(
        pedidos.flatMap((pedido) => pedido.produtos.map((p) => p.produtoId)),
      ),
    ];

    // Buscar produtos no Prisma (PostgreSQL)
    const produtos = await this.prisma.produtos.findMany({
      where: { produto_id: { in: produtoIds } },
    });

    // Criar um mapa de produtos para consulta rápida
    const produtosMap = new Map(
      produtos.map((produto) => [produto.produto_id, produto]),
    );

    // Adicionar detalhes dos produtos nos pedidos
    return pedidos.map((pedido) => ({
      ...pedido.toObject(), // Converter o pedido para objeto normal
      produtos: pedido.produtos.map((p) => ({
        produtoId: p.produtoId,
        quantidade: p.quantidade,
        nome_produto: produtosMap.get(p.produtoId).nome_produto,
        preco: produtosMap.get(p.produtoId).preco,
      })),
    }));
  }

  async atualizarPedido(
    id: string,
    updatePedidoDto: UpdatePedidoDto,
  ): Promise<Pedido> {
    const pedido = await this.pedidoModel
      .findByIdAndUpdate(id, updatePedidoDto, { new: true })
      .exec();
    if (!pedido) {
      throw new NotFoundException('Pedido não encontrado');
    }
    return pedido;
  }

  async deletarPedido(id: string): Promise<{ message: string }> {
    const pedido = await this.pedidoModel.findByIdAndDelete(id).exec();
    if (!pedido) {
      throw new NotFoundException('Pedido não encontrado');
    }
    return { message: 'Pedido deletado com sucesso' };
  }

  async adicionarProdutosAoPedido(
    id: string,
    novosProdutos: { produtoId: string; quantidade: number }[],
  ): Promise<Pedido> {
    const pedido = await this.pedidoModel.findById(id).exec();
    if (!pedido) throw new NotFoundException('Pedido não encontrado');

    // Adicionando os novos produtos ao array de produtos do pedido
    pedido.produtos = [...pedido.produtos, ...novosProdutos];

    return pedido.save();
  }

  async buscarPedidosComProdutos(): Promise<any[]> {
    const pedidos = await this.pedidoModel.find().exec();

    // Coletar todos os produtoId únicos
    const produtoIds = pedidos.flatMap((pedido) =>
      pedido.produtos.map((p) => p.produtoId),
    );

    // Buscar produtos no Prisma (PostgreSQL)
    const produtos = await this.prisma.produtos.findMany({
      where: { produto_id: { in: produtoIds } },
    });

    // Criar um mapa de produtos para consulta rápida
    const produtosMap = new Map(
      produtos.map((produto) => [produto.produto_id, produto]),
    );
    console.log(produtosMap);

    // Adicionar detalhes dos produtos nos pedidos
    const pedidosComProdutos = pedidos.map((pedido) => ({
      ...pedido.toObject(), // Transformar apenas o pedido em objeto normal
      produtos: pedido.produtos.map((p) => ({
        produtoId: p.produtoId,
        quantidade: p.quantidade,
        detalhes: produtosMap.get(p.produtoId) || null, // Adiciona detalhes do produto
      })),
    }));

    return pedidosComProdutos;
  }

  async atualizarPedidoCompleto(
    id: string,
    pedidoAtualizado: {
      clienteId: string;
      produtos: { produtoId: string; quantidade: number }[];
      valorPago: number;
      status: string;
    },
  ): Promise<Pedido> {
    const pedido = await this.pedidoModel.findById(id).exec();
    if (!pedido) throw new NotFoundException('Pedido não encontrado');
    // Atualizando os dados do pedido
    pedido.clienteId = pedidoAtualizado.clienteId;
    pedido.valorPago = pedidoAtualizado.valorPago;
    pedido.status = pedidoAtualizado.status;
    pedido.produtos = pedidoAtualizado.produtos; // Substitui a lista de produtos
    return pedido.save();
  }
}
