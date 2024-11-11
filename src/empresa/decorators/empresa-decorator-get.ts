import { applyDecorators, Get } from "@nestjs/common"
import { ApiOperation } from "@nestjs/swagger"
import { IsPublic } from "src/auth/decorators/is-public.decorator"

export const EmpresaDecoratorGetAll =() =>{
    return applyDecorators(
        Get('/'),
        IsPublic(),
        ApiOperation({ summary: 'Busca todas as empresas.' })
    )
}