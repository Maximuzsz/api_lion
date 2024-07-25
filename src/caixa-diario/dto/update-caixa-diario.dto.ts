import { PartialType } from '@nestjs/swagger';
import { CreateCaixaDiarioDto } from './create-caixa-diario.dto';

export class UpdateCaixaDiarioDto extends PartialType(CreateCaixaDiarioDto) {}
