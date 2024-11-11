import { applyDecorators, Post, Body } from "@nestjs/common";
import { ApiBody, ApiOperation } from "@nestjs/swagger";
import { IsPublic } from "src/auth/decorators/is-public.decorator";

export const ComprasCreateDecorator = () => {
  return applyDecorators(
    ApiOperation({ summary: "Criação de uma compra para o cliente" }),
    IsPublic(),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          clienteId: {
            type: 'string',
            description: 'ID do cliente.',
            example: 'sffsaterag',
          },
          itens: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                produto_Id: {
                  type: 'string',
                  description: 'ID do produto.',
                  example: 'prod12345',
                },
                requisitor_nome: {
                  type: 'string',
                  description: 'Nome do requisitor do item.',
                  example: 'João Silva',
                },
                quantidade: {
                  type: 'number',
                  description: 'Quantidade do produto solicitado.',
                  example: 2,
                },
              },
            },
          },
        },
      },
    }),
    Post(),
  );
};
