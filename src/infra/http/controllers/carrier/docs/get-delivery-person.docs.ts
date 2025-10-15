import { applyDecorators } from '@nestjs/common'
import {
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger'

export function GetDeliveryPersonDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Busca um entregador pelo ID',
      description: `
        Roles:
        - ADMIN
      `,
    }),
    ApiBearerAuth('access-token'),
    ApiParam({
      name: 'deliveryPersonId',
      type: 'string',
      example: 'c7d6e5f4-4321-8765-9abc-abcdef654321',
      required: true,
      description: 'ID do entregador',
    }),
    ApiResponse({
      status: 200,
      description: 'Entregador',
      schema: {
        type: 'object',
        properties: {
          deliveryPerson: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                example: 'b1e2c3d4-5678-1234-9abc-1234567890ab',
              },
              firstName: { type: 'string', example: 'João' },
              lastName: { type: 'string', example: 'Silva' },
              cpf: { type: 'string', example: '39053344705' },
              email: { type: 'string', example: 'joao@email.com' },
            },
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
      status: 404,
      description: 'Entregador não encontrado',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example:
              'Entregador "c7d6e5f4-4321-8765-9abc-abcdef654321" não encontrado',
          },
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
