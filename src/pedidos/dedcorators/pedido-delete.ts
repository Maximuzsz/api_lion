import { applyDecorators, Delete } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export const PedidoDeleteDecorator = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Remover um pedido' }),
    ApiParam({
      name: 'id',
      description: 'ID do pedido a ser removido',
      example: '65a7e2bfb3e214001f5c97b9',
    }),
    ApiResponse({
      status: 204,
      description: 'Pedido removido com sucesso',
    }),
    ApiResponse({
      status: 404,
      description: 'Pedido não encontrado',
    }),
    Delete(':id'),
  );
};
