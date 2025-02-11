import { applyDecorators, Patch } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export const PedidoUpdateDecorator = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Atualizar um pedido' }),
    ApiParam({
      name: 'id',
      description: 'ID do pedido a ser atualizado',
      example: '65a7e2bfb3e214001f5c97b9',
    }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            description: 'Novo status do pedido',
            example: 'concluído',
          },
          valorPago: {
            type: 'number',
            description: 'Valor atualizado já pago (opcional)',
            example: 100.0,
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
    Patch(':id'),
  );
};
