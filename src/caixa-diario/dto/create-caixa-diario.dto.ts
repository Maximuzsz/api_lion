import { IsNumber, IsString } from "class-validator";
import { CaixaDiario } from "../entities/caixa-diario.entity";

export class CreateCaixaDiarioDto extends CaixaDiario {
    @IsNumber()
    valorCartaoMaquina1?: number;
    @IsNumber()
    valorCartaoMaquina2?:number;
    @IsNumber()
    valorDinheiro?:number;
    @IsNumber()
    valorPix?:number;
    @IsNumber()
    valorentrada?:number;//valor iniciado no dio
    @IsNumber()
    valorFinal?:number; //valor Fim do dia
    @IsNumber()
    saida?:number;
    @IsNumber()
    totalDiario?:number;
    @IsString()
    empresa_id?:string;
    @IsString()
    usuario_id?:string;
}
