import { Module } from '@nestjs/common';
import { ComprasClientesService } from './compras-clientes.service';
import { ComprasClientesController } from './compras-clientes.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ComprasClientesController],
  providers: [ComprasClientesService],
})
export class ComprasClientesModule {}
