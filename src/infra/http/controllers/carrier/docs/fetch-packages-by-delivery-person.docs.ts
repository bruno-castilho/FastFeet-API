import { applyDecorators } from '@nestjs/common'
import {
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger'

export function FetchPackagesByDeliveryPersonDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Lista encomendas de um entregador',
      description: `
        Roles:
        - ADMIN
        - DELIVERY_PERSON
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
    ApiQuery({ name: 'page', type: Number, example: 1, required: false }),
    ApiResponse({
      status: 200,
      description: 'Lista de encomendas do entregador',
      schema: {
        type: 'object',
        properties: {
          packages: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  example: 'b1e2c3d4-5678-1234-9abc-1234567890ab',
                },
                heightInCentimeters: { type: 'number', example: 30 },
                widthInCentimeters: { type: 'number', example: 20 },
                weightInGrams: { type: 'number', example: 1500 },
                state: { type: 'string', example: 'CREATED' },
                recipientId: {
                  type: 'string',
                  example: 'a9f8e7d6-1234-5678-9abc-abcdef123456',
                },
                deliveredBy: {
                  type: 'string',
                  example: 'c7d6e5f4-4321-8765-9abc-abcdef654321',
                  nullable: true,
                },
                createdAt: {
                  type: 'string',
                  format: 'date-time',
                  example: '2024-01-01T12:00:00Z',
                },
                postedAt: {
                  type: 'string',
                  format: 'date-time',
                  nullable: true,
                  example: null,
                },
                pickedUpAt: {
                  type: 'string',
                  format: 'date-time',
                  nullable: true,
                  example: null,
                },
                deliveredAt: {
                  type: 'string',
                  format: 'date-time',
                  nullable: true,
                  example: null,
                },
                returnedAt: {
                  type: 'string',
                  format: 'date-time',
                  nullable: true,
                  example: null,
                },
              },
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
