import { applyDecorators, Put } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

export const ComprasDecoratorUpdate = () => {
    return applyDecorators(
        Put('update'),
        ApiOperation({
            summary: 'altera o status da compra',
          }),
          ApiBody({
            schema: {
              type: 'object',
              properties: {
                status: {
                    type: 'string',
                    description: 'se está paga ou não',
                    example: 'true',
                },
              },
            },
          }),
    );
};