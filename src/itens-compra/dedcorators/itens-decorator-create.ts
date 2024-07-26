import { applyDecorators, Post } from "@nestjs/common"
import { ApiBody, ApiOperation } from "@nestjs/swagger"

export const ItensCreateDecorator  =() =>{
    return applyDecorators(
        ApiOperation({ summary: "Criação do produto" }),
        ApiBody({
            schema: {
              type: 'object',
              properties: {
                compra_id: {
                    type: 'string',
                    description: 'id da compra',
                    example: 'asdsafddf',
                },
                produto_id: {
                    type: 'string',
                    description: 'id do produto.',
                    example: 'saaasd',
                },
                usuario_id: {
                    type: 'string',
                    description: 'id do usuario que está alterando',
                    example: 'sfmjdklfmklf',
                },
                quantidade: {
                    type: 'float',
                    description: 'quantidade do produto.',
                    example: '2',
                },
                preco_unitario: {
                    type: 'float',
                    description: 'preço do produto.',
                    example: '2.00',
                },
              },
            },
        }),
        Post(),
    )
}