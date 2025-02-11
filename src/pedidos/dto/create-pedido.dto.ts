import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePedidoDto {
  @IsString()
  clienteId: string;

  @IsArray()
  produtos: { produtoId: string; quantidade: number }[];

  @IsNumber()
  @IsOptional()
  valorPago?: number;

  @IsString()
  @IsOptional()
  status?: string;
}
