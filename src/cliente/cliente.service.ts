import { Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClienteService {
  constructor(private readonly prisma:PrismaService)  {} 

  async create(clienteCreateDto: CreateClienteDto){
    const data = {
      ...clienteCreateDto,
    }

    return await this.prisma.clientes.create({data})
  }

  async getAll(){
    return await this.prisma.clientes.findMany()
  }

  async update(cliente_id: string,cliente:UpdateClienteDto){
    return await this.prisma.clientes.update({
      data:{
        nome: cliente.nome,
        cpf:cliente.cpf,
        endereco:cliente.endereco,
        telefone:cliente.telefone,
      },
      where:{
        cliente_id
      }
    })
  }

}
;