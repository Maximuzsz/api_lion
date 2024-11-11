import { IsInt, IsArray, ValidateNested, IsString } from 'class-validator';
import { Type } from 'class-transformer';

class ItemCompraDto {
  @IsInt()
  produtoId: number;
  @IsString()
  requisitor_nome: string;
  @IsInt()
  quantidade: number;
}

export class CreateComprasClienteDto {
  @IsInt()
  clienteId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemCompraDto)
  itens: ItemCompraDto[];
}
