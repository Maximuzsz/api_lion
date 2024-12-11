import { IsString } from "class-validator";
import { Empresa } from "../entities/empresa.entity";

export class CreateEmpresaDto extends Empresa{
    @IsString()
    name: string;
    @IsString()
    email: string;
    @IsString()
    cnpj: string;
    @IsString()
    contato: string;
    @IsString()
    endereco: string;
}
