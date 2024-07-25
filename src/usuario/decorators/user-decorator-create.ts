import { applyDecorators, Post } from "@nestjs/common"
import { ApiBody, ApiOperation } from "@nestjs/swagger"
import { IsPublic } from "src/auth/decorators/is-public.decorator"

export const UsuarioCreateDecorator  =() =>{
    return applyDecorators(
        ApiOperation({ summary: "Criação do usuário" }),
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
                userName: {
                    type: 'string',
                    description: 'login usuário.',
                    example: 'teste2333',
                },
                password: {
                    type: 'string',
                    description: 'senha do usuário.',
                    example: 'Abc123',
                },
                companyId: {
                    type: 'string',
                    description: 'id da empresa.',
                    example: 'Abc123',
                },
              },
            },
        }),
        Post(),
    )
}