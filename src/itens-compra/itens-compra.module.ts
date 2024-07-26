import { Module } from '@nestjs/common';
import { ItensCompraService } from './itens-compra.service';
import { ItensCompraController } from './itens-compra.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ItensCompraController],
  providers: [ItensCompraService],
})
export class ItensCompraModule {}
