import { applyDecorators } from '@nestjs/common'
import {
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger'

export function MarkPackageAsPendingDocs() {
  return applyDecorators(
    ApiOperation({
      summary: "Marca uma encomenda como 'Aguardando'",
      description: `
        Roles:
        - ADMIN
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
    ApiResponse({
      status: 200,
      description: "Estado da encomenda alterado para 'Aguardando'",
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: "Estado da encomenda alterado para 'Aguardando'",
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
