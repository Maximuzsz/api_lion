import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CaixaDiarioController } from './caixa-diario.controller';
import { CaixaDiarioService } from './caixa-diario.service';

@Module({
  imports: [PrismaModule],
  controllers: [CaixaDiarioController],
  providers: [CaixaDiarioService],
})
export class CaixaDiarioModule {}
