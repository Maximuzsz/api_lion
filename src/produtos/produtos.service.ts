import { Injectable } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProdutosService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createProdutoDto: CreateProdutoDto) {
    const data = {
      ...createProdutoDto,
    };
    return await this.prisma.produtos.create({ data });
  }

  async getAll() {
    return await this.prisma.produtos.findMany();
  }

  async update(produto_id: string, produto: UpdateProdutoDto) {
    return await this.prisma.produtos.update({
      data: {
        preco: produto.preco,
        nome_produto: produto.nome_produto,
        marca: produto.marca,
        status: produto.status,
      },
      where: { produto_id },
    });
  }
}
