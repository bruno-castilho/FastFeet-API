import { RemoveRecipient } from '@/infra/use-cases/carrier/remove-recipient'
import { Controller, Param, Delete } from '@nestjs/common'
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('Recipient')
@Controller('/recipient/:recipientId')
export class RemoveRecipientController {
  constructor(private removeRecipient: RemoveRecipient) {}

  @Delete()
  @ApiOperation({
    summary: 'Remove um destinatário pelo ID',
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
    await this.removeRecipient.execute({
      recipientId,
    })

    return {
      message: 'Destinatário removido com sucesso!',
    }
  }
}
