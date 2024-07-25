import { Injectable } from '@nestjs/common';
import { CreateCaixaDiarioDto } from './dto/create-caixa-diario.dto';
import { UpdateCaixaDiarioDto } from './dto/update-caixa-diario.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CaixaDiarioService {
    constructor(private readonly prisma: PrismaService) {}

    async create(createCaixaDiarioDto: CreateCaixaDiarioDto) {
        const data = {
          ...createCaixaDiarioDto,
        };
        return  await this.prisma.caixaDiario.create({ data });
      }
    
      async findAll() {
        return await this.prisma.caixaDiario.findMany();
      }
    
      async findDate(dataLancamento: string ) {
        return await this.prisma.caixaDiario.findFirst({
          where: { dataLancamento}
        });
      }
    
      async update(caixa_id:string, update:UpdateCaixaDiarioDto) {
        return await this.prisma.caixaDiario.update({
          data: {
            valorCartao: update.valorCartao,
            valorDinheiro: update.valorDinheiro,
            valorPix: update.valorPix,
            troco:update.troco,
          },
          where: { caixa_id: caixa_id },
        });
      }
}
