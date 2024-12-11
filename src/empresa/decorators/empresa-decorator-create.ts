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
                    description: 'nome da empresa.',
                    example: 'Jose da Silva',
                },
                email: {
                    type: 'string',
                    description: 'email da empresa.',
                    example: 'teste2333',
                },
                cnpj: {
                    type: 'string',
                    description: 'cnpj da empresa.',
                    example: '444.4474.444.44',
                },
                contato: {
                    type: 'string',
                    description: 'telefone de contato.',
                    example: '6299999999',
                },
                endereco: {
                    type: 'string',
                    description: 'endereço da empresa.',
                    example: 'avenida 123',
                },
              },
            },
        }),
        Post(),
    )
}