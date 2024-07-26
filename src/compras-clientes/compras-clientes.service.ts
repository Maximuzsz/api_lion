import { Injectable } from '@nestjs/common';
import { CreateComprasClienteDto } from './dto/create-compras-cliente.dto';
import { UpdateComprasClienteDto } from './dto/update-compras-cliente.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ComprasClientesService {
  constructor(private readonly prisma: PrismaService){}

  async create(createComprasClienteDto:CreateComprasClienteDto){
    const data = {
      ...createComprasClienteDto,
    }

    return await this.prisma.comprasCliente.create({ data })
  }

  async getAll(){
    return await this.prisma.comprasCliente.findMany();
  }

  async getContasCliente(cliente_id: string) {
    return await  this.prisma.comprasCliente.findMany({
      where:{
        cliente_id
      }
    })
  }

  async update(compra_id: string, compra:UpdateComprasClienteDto){
    return await this.prisma.comprasCliente.update({
      data:{
        status: compra.status
      },
      where:{
        compra_id
      }
    })
  }

}
