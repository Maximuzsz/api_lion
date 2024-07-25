import { applyDecorators, Post } from "@nestjs/common"
import { ApiBody, ApiOperation } from "@nestjs/swagger"

export const CaixaCreateDecorator  =() =>{
    return applyDecorators(
        ApiOperation({ summary: "Criação da venda diária" }),
        ApiBody({
            schema: {
              type: 'object',
              properties: {
                valorCartao: {
                    type: 'string',
                    description: '',
                    example: 'Jose da Silva',
                },
                valorDinheiro: {
                    type: 'string',
                    description: 'login usuário.',
                    example: 'teste2333',
                },
                valorPix: {
                    type: 'string',
                    description: 'senha do usuário.',
                    example: 'Abc123',
                },
                troco: {
                    type: 'string',
                    description: 'id da empresa.',
                    example: 'Abc123',
                },
                dataLancamento: {
                    type: 'string',
                    description: 'id da empresa.',
                    example: 'Abc123',
                },
                empresa_id: {
                    type: 'string',
                    description: 'id da empresa.',
                    example: 'Abc123',
                },
                usuario_id: {
                    type: 'string',
                    description: 'id do usuario.',
                    example: 'Abc123',
                },
              },
            },
        }),
        Post(),
    )
}