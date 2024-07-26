import { Injectable } from '@nestjs/common';
import { CreateItensCompraDto } from './dto/create-itens-compra.dto';
import { UpdateItensCompraDto } from './dto/update-itens-compra.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ItensCompraService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createItensCompraDto: CreateItensCompraDto) {
    const data = {
      ...createItensCompraDto,
    }

    return await this.prisma.itensCompra.create({data})
  }


  async getItens(compra_id: string){
    return await this.prisma.itensCompra.findMany({
      where:{
        compra_id
      }
    })
  }

}
