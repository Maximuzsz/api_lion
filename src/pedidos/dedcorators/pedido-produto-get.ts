import { applyDecorators, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const PedidoListarComProdutosDecorator = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Listar pedidos com detalhes dos produtos do PostgreSQL',
    }),
    ApiResponse({
      status: 200,
      description: 'Lista de pedidos com detalhes dos produtos',
    }),
    Get('com-produtos'),
  );
};
