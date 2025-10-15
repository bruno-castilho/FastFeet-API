import { applyDecorators } from '@nestjs/common'
import {
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger'

export function GetRecipientDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Busca um destinatário pelo ID',
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
      description: 'Destinatário encontrado',
      schema: {
        type: 'object',
        properties: {
          recipient: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                example: 'a9f8e7d6-1234-5678-9abc-abcdef123456',
              },
              firstName: { type: 'string', example: 'Maria' },
              lastName: { type: 'string', example: 'Oliveira' },
              email: { type: 'string', example: 'maria@email.com' },
              phone: { type: 'string', example: '(11) 91234-5678' },
              cep: { type: 'string', example: '01001-000' },
              streetAddress: { type: 'string', example: 'Rua das Flores' },
              number: { type: 'number', example: 123 },
              complement: {
                type: 'string',
                example: 'Apto 45',
                nullable: true,
              },
              neighborhood: { type: 'string', example: 'Centro' },
              city: { type: 'string', example: 'São Paulo' },
              state: { type: 'string', example: 'SP' },
              country: { type: 'string', example: 'Brasil' },
              latitude: { type: 'number', example: -23.55052 },
              longitude: { type: 'number', example: -46.633308 },
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
