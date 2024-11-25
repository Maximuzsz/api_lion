import { applyDecorators, Get } from "@nestjs/common"
import { ApiOperation } from "@nestjs/swagger"
import { IsPublic } from "src/auth/decorators/is-public.decorator"

export const ComprasDecoratorGetAll =() =>{
    return applyDecorators(
        Get('/'),
        ApiOperation({ summary: 'Busca todas as compras.' })
    )
}