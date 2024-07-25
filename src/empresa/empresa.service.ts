import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEmpresaDto } from './dto/create-empresa.dto';

@Injectable()
export class EmpresaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createEmpresaDto: CreateEmpresaDto) {
    const data = {
      ...createEmpresaDto,
    };
    return  await this.prisma.empresa.create({ data });
  }

  async findAll() {
    return await this.prisma.empresa.findMany();
  }

  async findOne(empresa_id: string) {
    return await this.prisma.empresa.findUnique({
      where: { empresa_id },
    });
  }
}
