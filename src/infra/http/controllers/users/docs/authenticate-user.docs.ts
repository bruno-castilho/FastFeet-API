import { applyDecorators } from '@nestjs/common'
import { ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger'

export function AuthenticateUserDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Autentica um usuário',
    }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          cpf: { type: 'string', example: '39053344705' },
          password: { type: 'string', example: 'Senha@123' },
        },
        required: ['cpf', 'password'],
      },
    }),
    ApiResponse({
      status: 201,
      description: 'Autenticação realizada com sucesso',
      schema: {
        type: 'object',
        properties: {
          accessToken: { type: 'string' },
          message: { type: 'string', example: 'Bem Vindo!' },
        },
      },
    }),
    ApiResponse({
      status: 400,
      description: 'Parâmetros inválidos',
      schema: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Erro de validação' },
          errors: { type: 'object' },
        },
      },
    }),
    ApiResponse({
      status: 401,
      description: 'Credenciais inválidas',
      schema: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Credenciais inválidas' },
        },
      },
    }),
  )
}
