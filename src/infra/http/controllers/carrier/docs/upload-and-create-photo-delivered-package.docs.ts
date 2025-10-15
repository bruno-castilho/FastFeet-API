import { applyDecorators } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger'

export function UploadAndCreatePhotoDeliveredPackageDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Faz upload da foto da encomenda entregue',
      description: `
        Roles:
        - ADMIN
        - DELIVERY_PERSON
      `,
    }),
    ApiBearerAuth('access-token'),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      description: 'Arquivo de imagem JPEG ou PNG de até 2MB',
      schema: {
        type: 'object',
        properties: {
          file: {
            type: 'string',
            format: 'binary',
          },
        },
        required: ['file'],
      },
    }),
    ApiResponse({
      status: 201,
      description: 'Foto da encomenda entregue carregada com sucesso',
      schema: {
        type: 'object',
        properties: {
          photoDeliveredPackageId: {
            type: 'string',
            example: 'd8e7f6a5-1234-5678-9abc-abcdef987654',
          },
        },
      },
    }),
    ApiResponse({
      status: 400,
      description: 'Parâmetros inválidos ou arquivo ausente',
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
      description: 'Tipo de arquivo inválido',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Tipo de arquivo inválido para foto da encomenda entregue',
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
