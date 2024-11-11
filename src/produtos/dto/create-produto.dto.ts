import { IsNumber, IsString } from "class-validator";
import { Produto } from "../entities/produto.entity";

export class CreateProdutoDto extends Produto{
    @IsString()
    nome_produto: string;
    @IsNumber()
    preco:number;
    @IsString()
    marca: string;
    @IsString()
    status: string;
    @IsString()
    usuario_id: string;

}
