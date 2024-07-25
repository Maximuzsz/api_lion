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
    return  await this.prisma.produtos.create({data});
  }


  async getAll() {
    return  await this.prisma.produtos.findMany();
  }

  async getFalta() {
    return await this.prisma.produtos.findMany(
      {
        where: {
          status: false
        }
      }
    )
  }

  async update(produto_id: string, produto: UpdateProdutoDto) {
    return await this.prisma.produtos.update({
      data: {
        preco: produto.preco,
        status:produto.status
      },
      where: { produto_id },
    })
  }



}
