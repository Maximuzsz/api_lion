import { IsString } from "class-validator";
import { Cliente } from "../entities/cliente.entity";

export class CreateClienteDto extends Cliente{
    @IsString()
    nome: string;
    @IsString()
    cpf?:string;
    @IsString()
    telefone?: string;
    @IsString()
    endereco?:string;
    @IsString()
    usuario_id: string;
}
