import { applyDecorators, Post } from "@nestjs/common";
import { ApiBody, ApiOperation } from "@nestjs/swagger";

export const ClienteCreateDecorator = () => {
  return applyDecorators(
    ApiOperation({
      summary: "Criação de um novo cliente",
      description: "Endpoint responsável pela criação de um novo cliente no sistema.",
    }),
    ApiBody({
      schema: {
        type: 'object',
        required: ['nome', 'usuario_id'], // Define os campos obrigatórios
        properties: {
          nome: {
            type: 'string',
            description: 'Nome completo do cliente. Este campo é obrigatório.',
            example: 'José da Silva',
          },
          cpf: {
            type: 'string',
            description: 'CPF do cliente. Deve conter 11 dígitos.',
            example: '0943948594',
            pattern: '^[0-9]{11}$', // Adiciona um padrão para validação
          },
          telefone: {
            type: 'string',
            description: 'Telefone de contato do cliente, incluindo o DDD.',
            example: '6299999999',
            pattern: '^[0-9]{10,11}$', // Validação para 10 ou 11 dígitos
          },
          endereco: {
            type: 'string',
            description: 'Endereço completo do cliente, incluindo rua, número e bairro.',
            example: 'Rua 00, Número 123, Bairro Centro',
          },
          usuario_id: {
            type: 'string',
            description: 'ID do usuário que está criando o cliente. Este campo é obrigatório.',
            example: 'Abc123',
          },
        },
      },
    }),
    Post(),
  );
}
