import { applyDecorators } from '@nestjs/common'
import {
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger'

export function UpdatePackageDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Atualiza os dados de uma encomenda',
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
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          heightInCentimeters: { type: 'number', example: 30 },
          widthInCentimeters: { type: 'number', example: 20 },
          weightInGrams: { type: 'number', example: 1500 },
          recipientId: {
            type: 'string',
            example: 'a9f8e7d6-1234-5678-9abc-abcdef123456',
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
      status: 200,
      description: 'Encomenda atualizada com sucesso',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Encomenda atualizada com sucesso!',
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
      description: 'Destinatário não encontrado',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example:
              'Destinatário "a9f8e7d6-1234-5678-9abc-abcdef123456" não encontrado',
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
