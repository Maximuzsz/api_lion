import { Body } from '@nestjs/common';
import { EmpresaDecorator } from './decorators/empresa-decorator';
import { EmpresaCreateDecorator } from './decorators/empresa-decorator-create';
import { EmpresaDecoratorGetAll } from './decorators/empresa-decorator-get';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { EmpresaService } from './empresa.service';

@EmpresaDecorator()
export class EmpresaController {
  constructor(private readonly empresaService: EmpresaService) {}

  @EmpresaCreateDecorator()
  create(@Body() createEmpresaDto: CreateEmpresaDto) {
    return this.empresaService.create(createEmpresaDto);
  }

  @EmpresaDecoratorGetAll()
  findAll() {
    return this.empresaService.findAll();
  }
}
