import { GetRecipient } from '@/infra/use-cases/carrier/get-recipient'
import { Controller, Get, Param } from '@nestjs/common'
import { RecipientPresenter } from '../presenters/recipient-presenter'
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('Recipient')
@Controller('/recipient/:recipientId')
export class GetRecipientController {
  constructor(private getRecipient: GetRecipient) {}

  @Get()
  @ApiOperation({
    summary: 'Busca um destinatário pelo ID',
  })
  @ApiParam({
    name: 'recipientId',
    type: 'string',
    example: 'a9f8e7d6-1234-5678-9abc-abcdef123456',
    required: true,
    description: 'ID do destinatário',
  })
  @ApiResponse({
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
            complement: { type: 'string', example: 'Apto 45', nullable: true },
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
  })
  @ApiResponse({
    status: 400,
    description: 'Parâmetros inválidos',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Erro de validação' },
        errors: { type: 'object' },
      },
    },
  })
  @ApiResponse({
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
  })
  async handle(@Param('recipientId') recipientId: string) {
    const { recipient } = await this.getRecipient.execute({
      recipientId,
    })

    return {
      recipient: RecipientPresenter.toHTTP(recipient),
    }
  }
}
