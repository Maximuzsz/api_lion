import { applyDecorators, Post } from "@nestjs/common"
import { ApiBody, ApiOperation } from "@nestjs/swagger"
import { IsPublic } from "src/auth/decorators/is-public.decorator"

export const ComprasCreateDecorator  =() =>{
    return applyDecorators(
        ApiOperation({ summary: "Criação do usuário" }),
        IsPublic(),
        ApiBody({
            schema: {
              type: 'object',
              properties: {
                cliente_id: {
                    type: 'string',
                    description: 'id do cliente.',
                    example: 'sffsaterag',
                },
                status: {
                    type: 'boolean',
                    description: 'status da conta pago ou não.',
                    example: 'false',
                },
                usuario_id: {
                    type: 'string',
                    description: 'id do usuario.',
                    example: 'dsffsdfsdfs',
                },
              },
            },
        }),
        Post(),
    )
}