import { Injectable } from '@nestjs/common';
import { CreateCaixaDiarioDto } from './dto/create-caixa-diario.dto';
import { UpdateCaixaDiarioDto } from './dto/update-caixa-diario.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CaixaDiarioService {
    constructor(private readonly prisma: PrismaService) {}

    async create(createCaixaDiarioDto: CreateCaixaDiarioDto) {
      const data = {
        valorCartaoMaquina1: createCaixaDiarioDto.valorCartaoMaquina1,
        valorCartaoMaquina2:createCaixaDiarioDto.valorCartaoMaquina2,
        valorDinheiro:createCaixaDiarioDto.valorDinheiro,
        valorPix:createCaixaDiarioDto.valorPix,
        valorentrada:createCaixaDiarioDto.valorentrada,//valor iniciado no dio
        valorFinal:createCaixaDiarioDto.valorFinal, //valor Fim do dia
        saida:createCaixaDiarioDto.saida,
        totalDiario:createCaixaDiarioDto.totalDiario,
        dataLancamento: new Date(),
        empresa_id:createCaixaDiarioDto.empresa_id,
        usuario_id:createCaixaDiarioDto.usuario_id,
        fechado: createCaixaDiarioDto.fechado
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
        console.log(update)
        return await this.prisma.caixaDiario.update({
          data: {
            valorCartaoMaquina1: update.valorCartaoMaquina1,
            valorCartaoMaquina2:update.valorCartaoMaquina2,
            valorDinheiro:update.valorDinheiro,
            valorPix:update.valorPix,
            valorentrada:update.valorentrada,//valor iniciado no dio
            valorFinal:update.valorFinal, //valor Fim do dia
            saida:update.saida,
            totalDiario:update.totalDiario,
            fechado: update.fechado
          },
          where: { caixa_id: caixa_id },
        });
      }
}
