import { applyDecorators, Post } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

export const PedidoCreateDecorator = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Criação de um pedido' }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          clienteId: {
            type: 'string',
            description: 'ID do cliente',
            example: '654ffb6d321b1a001ff00b77',
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
                  example: 'prd123456',
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
            description: 'Valor já pago pelo pedido (opcional)',
            example: 50.0,
          },
          status: {
            type: 'string',
            description: 'Status do pedido (opcional)',
            example: 'pendente',
          },
        },
      },
    }),
    Post(),
  );
};
