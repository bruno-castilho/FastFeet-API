import { applyDecorators } from '@nestjs/common'
import { ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger'

export function RegisterUserDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Registra um novo usuário',
    }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          firstName: { type: 'string', example: 'João' },
          lastName: { type: 'string', example: 'Silva' },
          cpf: { type: 'string', example: '39053344705' },
          email: { type: 'string', example: 'joao@email.com' },
          password: { type: 'string', example: 'Senha@123' },
          role: { type: 'enum', example: 'ADMIN' },
        },
        required: ['firstName', 'lastName', 'cpf', 'email', 'password', 'role'],
      },
    }),
    ApiResponse({
      status: 201,
      description: 'Usuário registrado com sucesso',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Usuário registrado com sucesso!',
          },
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
      status: 409,
      description: 'E-mail já cadastrado',
      schema: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'E-mail já cadastrado' },
        },
      },
    }),
    ApiResponse({
      status: 409,
      description: 'CPF já cadastrado',
      schema: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'CPF já cadastrado' },
        },
      },
    }),
    ApiResponse({
      status: 403,
      description: 'Acesso negado',
      schema: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Forbidden resource' },
          error: { type: 'string', example: 'Forbidden' },
        },
      },
    }),
    ApiResponse({
      status: 401,
      description: 'Não autorizado',
      schema: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Unauthorized' },
        },
      },
    }),
  )
}
