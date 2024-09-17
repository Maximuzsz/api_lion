import { Produto } from "../entities/produto.entity";

export class CreateProdutoDto extends Produto{
    nome_produto: string;
    preco:number;
    marca: string;
    status: boolean;
    usuario_id: string;

}
