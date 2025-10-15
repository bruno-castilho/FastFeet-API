import { applyDecorators } from '@nestjs/common'
import {
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger'

export function RemoveRecipientDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Remove um destinatário pelo ID',
      description: `
        Roles:
        - ADMIN
      `,
    }),
    ApiBearerAuth('access-token'),
    ApiParam({
      name: 'recipientId',
      type: 'string',
      example: 'a9f8e7d6-1234-5678-9abc-abcdef123456',
      required: true,
      description: 'ID do destinatário',
    }),
    ApiResponse({
      status: 200,
      description: 'Destinatário removido com sucesso',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Destinatário removido com sucesso!',
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
