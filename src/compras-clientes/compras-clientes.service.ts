import { Injectable, NotFoundException } from '@nestjs/common';
import { ItensCompra } from 'src/itens-compra/entities/itens-compra.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ComprasClientesService {
  constructor(private readonly prisma: PrismaService){}

  async create(cliente_id: string, itens: { produto_Id: string; requisitor_nome: string; quantidade: number}[]){
    // Validar cliente
    const cliente = await this.prisma.clientes.findUnique({ where: { cliente_id: cliente_id } });
    if (!cliente) throw new NotFoundException('Cliente não encontrado');

    // Calcular total e criar itens da compra
    let totalCompra = 0;
    let usuario_id = '';

    const itensCompra = await Promise.all(
      itens.map(async (item) => {
        const produto = await this.prisma.produtos.findUnique({ where: { produto_id: item.produto_Id } });
        if (!produto) throw new NotFoundException(`Produto com ID ${item.produto_Id} não encontrado`);
        
        const precoTotalItem = produto.preco * item.quantidade;
        totalCompra += precoTotalItem;
        usuario_id = produto.usuario_id;

        return {
          produto_id: produto.produto_id,
          requisitor_nome: item.requisitor_nome,
          quantidade: item.quantidade,
          precoUnitario: produto.preco,
          precoTotal: precoTotalItem,
          usuario_id: produto.usuario_id
        };
      })
    );

    // Criar compra e itens associados
    return this.prisma.compra.create({
      data: {
        cliente_id,
        total: totalCompra,
        usuario_id: usuario_id,
        itens: {
          create: itensCompra,
        },
      },
      include: {
        itens: true,
      },
    });
  
  }

  async getAll(){
    const contas = await this.prisma.compra.findMany({
      include: {
        cliente: true, // Inclui os dados do cliente associado
        user: true,    // Inclui os dados do usuário (caso necessário)
      },
    });

    const contasFormatadas = contas.map(compra => ({
      id: compra.id,
      cliente_id: compra.cliente_id,
      dataCompra: compra.dataCompra,
      total: compra.total,
      valorPago: compra.valorPago,
      usuario_id: compra.usuario_id,
      usuario_name: compra.user.userName,
      nome_cliente: compra.cliente.nome
    }));
  
    return contasFormatadas;
  }

  async getContasCliente(cliente_id: string) {
    return await  this.prisma.compra.findMany({
      where:{
        cliente_id
      }
    })
  }

}
