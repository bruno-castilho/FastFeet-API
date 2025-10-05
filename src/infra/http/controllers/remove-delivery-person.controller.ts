import { RemoveDeliveryPerson } from '@/infra/use-cases/carrier/remove-delivery-person'
import { Controller, Delete, Param } from '@nestjs/common'
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('Deliveryperson')
@Controller('/deliveryperson/:deliveryPersonId')
export class RemoveDeliveryPersonController {
  constructor(private removeDeliveryPerson: RemoveDeliveryPerson) {}

  @Delete()
  @ApiOperation({
    summary: 'Remove um entregador',
  })
  @ApiParam({
    name: 'deliveryPersonId',
    type: 'string',
    example: 'c7d6e5f4-4321-8765-9abc-abcdef654321',
    required: true,
    description: 'ID do entregador',
  })
  @ApiResponse({
    status: 200,
    description: 'Entregador removido com sucesso',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Entregador removido com sucesso!',
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
    description: 'Entregador não encontrado',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example:
            'Entregador "c7d6e5f4-4321-8765-9abc-abcdef654321" não encontrado',
        },
      },
    },
  })
  async handle(@Param('deliveryPersonId') deliveryPersonId: string) {
    await this.removeDeliveryPerson.execute({
      deliveryPersonId,
    })

    return {
      message: 'Entregador removido com sucesso!',
    }
  }
}
