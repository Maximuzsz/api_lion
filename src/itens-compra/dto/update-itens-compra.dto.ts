import { PartialType } from '@nestjs/swagger';
import { CreateItensCompraDto } from './create-itens-compra.dto';

export class UpdateItensCompraDto extends PartialType(CreateItensCompraDto) {}
