import { applyDecorators, Put } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

export const ProddutoDecoratorUpdate = () => {
    return applyDecorators(
        Put('update:produto_id'),
        ApiOperation({
            summary: 'altera os dados do produto',
          }),
          ApiBody({
            schema: {
              type: 'object',
              properties: {
                preco: {
                  type: 'float',
                  description: 'Preço do produto.',
                  example: '2.99',
                },
                status: {
                    type: 'string',
                    description: 'se está em falta ou não',
                    example: 'true',
                },
              },
            },
          }),
    );
};