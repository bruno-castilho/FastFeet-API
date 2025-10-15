import { applyDecorators } from '@nestjs/common'
import {
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger'

export function CreateRecipientDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Registra um novo destinatário',
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
          firstName: { type: 'string', example: 'Maria' },
          lastName: { type: 'string', example: 'Oliveira' },
          email: { type: 'string', example: 'maria@email.com' },
          phone: { type: 'string', example: '(11) 91234-5678' },
          cep: { type: 'string', example: '01001-000' },
          streetAddress: { type: 'string', example: 'Rua das Flores' },
          number: { type: 'number', example: 123 },
          complement: { type: 'string', example: 'Apto 45', nullable: true },
          neighborhood: { type: 'string', example: 'Centro' },
          city: { type: 'string', example: 'São Paulo' },
          state: { type: 'string', example: 'SP' },
          country: { type: 'string', example: 'Brasil' },
        },
        required: [
          'firstName',
          'lastName',
          'email',
          'phone',
          'cep',
          'streetAddress',
          'number',
          'neighborhood',
          'city',
          'state',
          'country',
        ],
      },
    }),
    ApiResponse({
      status: 201,
      description: 'Destinatário registrado com sucesso',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Destinatário registrado com sucesso!',
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
      status: 422,
      description: 'CEP inválido',
      schema: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'CEP inválido' },
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
