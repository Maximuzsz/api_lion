import { applyDecorators, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export const PedidosUpdateDecorator = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Atualizar um pedido completo' }),
    ApiParam({
      name: 'id',
      description: 'ID do pedido a ser atualizado',
      example: '65a7e2bfb3e214001f5c97b9',
    }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          clienteId: {
            type: 'string',
            description: 'ID do cliente associado ao pedido',
            example: 'cli123456',
          },
          produtos: {
            type: 'array',
            description: 'Lista de produtos do pedido',
            items: {
              type: 'object',
              properties: {
                produtoId: {
                  type: 'string',
                  description: 'ID do produto',
                  example: 'prd987654',
                },
                quantidade: {
                  type: 'number',
                  description: 'Quantidade do produto',
                  example: 2,
                },
              },
            },
          },
          valorPago: {
            type: 'number',
            description: 'Valor total pago pelo pedido',
            example: 150.75,
          },
          status: {
            type: 'string',
            description: 'Status do pedido (ex: pendente, pago, cancelado)',
            example: 'pago',
          },
        },
      },
    }),
    ApiResponse({
      status: 200,
      description: 'Pedido atualizado com sucesso',
    }),
    ApiResponse({
      status: 404,
      description: 'Pedido não encontrado',
    }),
    Put(':id/pedidoCompleto'),
  );
};
