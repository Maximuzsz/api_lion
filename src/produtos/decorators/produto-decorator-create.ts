import { applyDecorators, Post } from "@nestjs/common"
import { ApiBody, ApiOperation } from "@nestjs/swagger"

export const ProdutoCreateDecorator  =() =>{
    return applyDecorators(
        ApiOperation({ summary: "Criação do produto" }),
        Post(),
        ApiBody({
            schema: {
              type: 'object',
              properties: {
                nome_produto: {
                    type: 'string',
                    description: '',
                    example: 'Serra Marmore',
                },
                preco: {
                    type: 'float',
                    description: 'Preço do produto.',
                    example: '2.99',
                },
                marca: {
                    type: 'string',
                    description: 'marca do produto',
                    example: 'true',
                },
                status: {
                    type: 'string',
                    description: 'se está em falta ou não',
                    example: 'EM_FALTA',
                },
                usuario_id: {
                    type: 'string',
                    description: 'id do usuario.',
                    example: 'Abc123',
                },
              },
            },
        }),
        
    )
}