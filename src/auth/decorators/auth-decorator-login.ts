import { applyDecorators, Post, UseGuards } from "@nestjs/common"
import { ApiBody, ApiOperation } from "@nestjs/swagger"
import { LocalAuthGuard } from "../guards/local-auth.guard"
import { IsPublic } from "./is-public.decorator"

export const AuthDecoratorLogin=() =>{
    return applyDecorators(
        IsPublic(),
        Post('login'),
        ApiOperation({ summary: 'autentica o  usuário.' }),
        ApiBody({
            schema: {
              type: 'object',
              properties: {
                userName: {
                    type: 'string',
                    description: 'login do usuário.',
                    example: 'TESTE213',
                },
                password: {
                    type: 'string',
                    description: 'senha do usuário.',
                    example: 'Abc123',
                },
              },
            },
        }),
        UseGuards(LocalAuthGuard)
    )
}