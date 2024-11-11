import { Injectable } from '@nestjs/common';
import { CreateItensCompraDto } from './dto/create-itens-compra.dto';
import { UpdateItensCompraDto } from './dto/update-itens-compra.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ItensCompraService {
  constructor(private readonly prisma: PrismaService) {}
 

}
