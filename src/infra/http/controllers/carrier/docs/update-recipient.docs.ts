import { applyDecorators } from '@nestjs/common'
import {
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger'

export function UpdateRecipientDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Atualiza os dados de um destinatário',
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
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          firstName: { type: 'string', example: 'Maria' },
          lastName: { type: 'string', example: 'Oliveira' },
          email: { type: 'string', example: 'maria@email.com' },
          cep: { type: 'string', example: '01001-000' },
          city: { type: 'string', example: 'São Paulo' },
          state: { type: 'string', example: 'SP' },
          country: { type: 'string', example: 'Brasil' },
          neighborhood: { type: 'string', example: 'Centro' },
          number: { type: 'number', example: 123 },
          phone: { type: 'string', example: '(11) 91234-5678' },
          streetAddress: { type: 'string', example: 'Rua das Flores' },
          complement: { type: 'string', example: 'Apto 45', nullable: true },
        },
        required: [
          'firstName',
          'lastName',
          'email',
          'cep',
          'city',
          'state',
          'country',
          'neighborhood',
          'number',
          'phone',
          'streetAddress',
        ],
      },
    }),
    ApiResponse({
      status: 200,
      description: 'Destinatário atualizado com sucesso',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Destinatário atualizado com sucesso!',
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
