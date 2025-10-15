import { applyDecorators } from '@nestjs/common'
import {
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger'

export function CreatePackageDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Registra uma nova encomenda',
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
          heightInCentimeters: { type: 'number', example: 30 },
          widthInCentimeters: { type: 'number', example: 20 },
          weightInGrams: { type: 'number', example: 1500 },
          recipientId: {
            type: 'string',
            format: 'uuid',
            example: 'b1e2c3d4-5678-1234-9abc-1234567890ab',
          },
        },
        required: [
          'heightInCentimeters',
          'widthInCentimeters',
          'weightInGrams',
          'recipientId',
        ],
      },
    }),
    ApiResponse({
      status: 201,
      description: 'Encomenda registrada com sucesso',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Encomenda registrada com sucesso!',
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
      description: 'Destinatário não encontrado',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example:
              'Destinatário "b1e2c3d4-5678-1234-9abc-1234567890ab" não existe.',
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
