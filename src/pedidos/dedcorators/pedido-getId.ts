import { applyDecorators, Get } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export const PedidoFindByIdDecorator = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Buscar um pedido pelo ID' }),
    ApiParam({
      name: 'id',
      description: 'ID do pedido',
      example: '65a7e2bfb3e214001f5c97b9',
    }),
    ApiResponse({
      status: 200,
      description: 'Pedido encontrado com sucesso',
    }),
    ApiResponse({
      status: 404,
      description: 'Pedido não encontrado',
    }),
    Get(':id'),
  );
};
