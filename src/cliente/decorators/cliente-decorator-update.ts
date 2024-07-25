import { applyDecorators, Put } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

export const ClienteDecoratorUpdate = () => {
    return applyDecorators(
        Put('update'),
        ApiOperation({
            summary: 'altera os dados do cliente',
          }),
          ApiBody({
            schema: {
              type: 'object',
              properties: {
                nome: {
                  type: 'string',
                  description: '',
                  example: 'José da Silva',
                },
                cpf: {
                    type: 'string',
                    description: 'cpf do cliente.',
                    example: '0943948594',
                },
                telefone: {
                    type: 'string',
                    description: 'telefone do cliente',
                    example: '6299999999',
                },
                endereco: {
                    type: 'string',
                    description: 'endereco do cliente',
                    example: 'rua 00',
                },
              },
            },
          }),
    );
};