import { applyDecorators } from '@nestjs/common'
import {
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger'

export function MarkPackageAsDeliveredDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Marca uma encomenda como entregue',
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
          photoDeliveredPackageId: {
            type: 'string',
            example: 'd8e7f6a5-1234-5678-9abc-abcdef987654',
          },
        },
        required: ['deliveryPersonId', 'photoDeliveredPackageId'],
      },
    }),
    ApiResponse({
      status: 200,
      description: "Estado da encomenda alterado para 'Entregue'",
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: "Estado da encomenda alterado para 'Entregue'",
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
              'Encomenda "b1e2c3d4-5678-1234-9abc-1234567890ab" não encontrada',
          },
        },
      },
    }),
    ApiResponse({
      status: 406,
      description: 'Foto da encomenda não encontrada',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: `Foto "d8e7f6a5-1234-5678-9abc-abcdef987654" não existe.`,
          },
        },
      },
    }),
    ApiResponse({
      status: 403,
      description: 'O entregador não retirou a encomenda',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example:
              'Somente o entregador que retirou a encomenda pode marcar ela como entregue.',
          },
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
