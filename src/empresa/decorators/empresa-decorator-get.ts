import { applyDecorators, Get } from "@nestjs/common"
import { ApiOperation } from "@nestjs/swagger"

export const EmpresaDecoratorGetAll =() =>{
    return applyDecorators(
        Get('/'),
        ApiOperation({ summary: 'Busca todas as empresas.' })
    )
}