import { applyDecorators, Patch } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export const PedidoAddProdutosDecorator = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Adicionar mais produtos a um pedido existente' }),
    ApiParam({
      name: 'id',
      description: 'ID do pedido',
      example: '65a7e2bfb3e214001f5c97b9',
    }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          produtos: {
            type: 'array',
            description: 'Lista de novos produtos a serem adicionados',
            items: {
              type: 'object',
              properties: {
                produtoId: {
                  type: 'string',
                  description: 'ID do novo produto',
                  example: 'prd987654',
                },
                quantidade: {
                  type: 'number',
                  description: 'Quantidade do novo produto',
                  example: 3,
                },
              },
            },
          },
        },
      },
    }),
    ApiResponse({
      status: 200,
      description: 'Produtos adicionados com sucesso ao pedido',
    }),
    ApiResponse({
      status: 404,
      description: 'Pedido não encontrado',
    }),
    Patch(':id/adicionar-produtos'),
  );
};
