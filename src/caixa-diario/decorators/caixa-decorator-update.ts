import { applyDecorators, Put } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

export const CaixaDecoratorUpdate = () => {
    return applyDecorators(
        Put('update'),
        ApiOperation({
            summary: 'altera os dados da vendda',
          }),
          ApiBody({
            schema: {
              type: 'object',
              properties: {
                valorCartao: {
                    type: 'string',
                    description: '',
                    example: 'Jose da Silva',
                },
                valorDinheiro: {
                    type: 'string',
                    description: 'login usuário.',
                    example: 'teste2333',
                },
                valorPix: {
                    type: 'string',
                    description: 'senha do usuário.',
                    example: 'Abc123',
                },
                troco: {
                    type: 'string',
                    description: 'id da empresa.',
                    example: 'Abc123',
                },
              },
            },
          }),
    );
};