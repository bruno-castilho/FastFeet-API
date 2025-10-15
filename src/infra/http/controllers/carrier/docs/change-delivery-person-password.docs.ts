import { applyDecorators } from '@nestjs/common'
import {
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger'

export function ChangeDeliveryPersonPasswordDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Altera a senha de um entregador',
      description: `
        Roles:
        - ADMIN
      `,
    }),
    ApiBearerAuth('access-token'),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          password: { type: 'string', example: 'NovaSenha@123' },
        },
        required: ['password'],
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
      status: 404,
      description: 'Entregador não encontrado',
      schema: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Entregador não encontrado' },
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
