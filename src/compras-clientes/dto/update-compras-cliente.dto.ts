import { PartialType } from '@nestjs/swagger';
import { CreateComprasClienteDto } from './create-compras-cliente.dto';

export class UpdateComprasClienteDto extends PartialType(CreateComprasClienteDto) {}
