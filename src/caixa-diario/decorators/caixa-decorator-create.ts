import { applyDecorators, Post } from "@nestjs/common"
import { ApiBody, ApiOperation } from "@nestjs/swagger"

export const CaixaCreateDecorator  =() =>{
    return applyDecorators(
        ApiOperation({ summary: "Criação da venda diária" }),
        ApiBody({
            schema: {
              type: 'object',
              properties: {
                valorCartaoMaquina1: {
                    type: 'number',
                    description: '',
                    example: '12.78',
                },
                valorCartaoMaquina2: {
                    type: 'number',
                    description: '',
                    example: '12.78',
                },
                valorDinheiro: {
                    type: 'number',
                    description: '',
                    example: '12.78',
                },
                valorPix: {
                    type: 'number',
                    description: '',
                    example: '12.78',
                },
                valorentrada: {
                    type: 'number',
                    description: '',
                    example: '12.78',
                },
                valorFinal: {
                    type: 'number',
                    description: '',
                    example: '12.78',
                },
                saida: {
                    type: 'number',
                    description: '',
                    example: '12.78',
                },
                totalDiario: {
                    type: 'number',
                    description: '',
                    example: '12.78',
                },
                empresa_id: {
                    type: 'string',
                    description: 'id da empresa.',
                    example: 'Abc123',
                },
                usuario_id: {
                    type: 'string',
                    description: 'id do usuario.',
                    example: 'Abc123',
                },
              },
            },
        }),
        Post(),
    )
}