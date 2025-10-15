import { applyDecorators } from '@nestjs/common'
import {
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger'

export function MarkPackageAsPickedUpDocs() {
  return applyDecorators(
    ApiOperation({
      summary: "Marca uma encomenda como 'Retirado'",
      description: `
        Roles:
        - ADMIN
        - DELIVERY_PERSON
      `,
    }),
    ApiBearerAuth('access-token'),
    ApiParam({
      name: 'packageId',
      type: 'string',
      example: 'b1e2c3d4-5678-1234-9abc-1234567890ab',
      required: true,
      description: 'ID da encomenda',
    }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          deliveryPersonId: {
            type: 'string',
            example: 'c7d6e5f4-4321-8765-9abc-abcdef654321',
          },
        },
        required: ['deliveryPersonId'],
      },
    }),
    ApiResponse({
      status: 200,
      description: "Estado da encomenda alterado para 'Retirado'",
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: "Estado da encomenda alterado para 'Retirado'",
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
      description: 'Encomenda não encontrada',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example:
              'Encomenda  "b1e2c3d4-5678-1234-9abc-1234567890ab" não encontrada',
          },
        },
      },
    }),
    ApiResponse({
      status: 403,
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
