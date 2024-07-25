import { applyDecorators, Post } from "@nestjs/common"
import { ApiBody, ApiOperation } from "@nestjs/swagger"
import { IsPublic } from "src/auth/decorators/is-public.decorator"

export const EmpresaCreateDecorator  =() =>{
    return applyDecorators(
        ApiOperation({ summary: "Criação da empresa" }),
        IsPublic(),
        ApiBody({
            schema: {
              type: 'object',
              properties: {
                name: {
                    type: 'string',
                    description: 'nome do usuário.',
                    example: 'Jose da Silva',
                },
                email: {
                    type: 'string',
                    description: 'login usuário.',
                    example: 'teste2333',
                }
              },
            },
        }),
        Post(),
    )
}