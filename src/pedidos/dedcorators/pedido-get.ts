import { applyDecorators, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const PedidoFindAllDecorator = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Listar todos os pedidos' }),
    ApiResponse({
      status: 200,
      description: 'Lista de pedidos retornada com sucesso',
    }),
    Get(),
  );
};
