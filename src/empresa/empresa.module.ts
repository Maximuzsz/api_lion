import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EmpresaController } from './empresa.controller';
import { EmpresaService } from './empresa.service';

@Module({
  imports: [PrismaModule],
  controllers: [EmpresaController],
  providers: [EmpresaService]
})
export class EmpresaModule {}
