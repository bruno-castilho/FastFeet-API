import { GetDeliveryPerson } from '@/infra/use-cases/carrier/get-delivery-person'
import { Controller, Get, Param } from '@nestjs/common'
import { DeliveryPersonPresenter } from '../presenters/deliver-person-presenter'
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('Deliveryperson')
@Controller('/deliveryperson/:deliveryPersonId')
export class GetDeliveryPersonController {
  constructor(private getDeliveryPerson: GetDeliveryPerson) {}

  @Get()
  @ApiOperation({
    summary: 'Busca um entregador pelo ID',
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
    description: 'Entregador',
    schema: {
      type: 'object',
      properties: {
        deliveryPerson: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: 'b1e2c3d4-5678-1234-9abc-1234567890ab',
            },
            firstName: { type: 'string', example: 'João' },
            lastName: { type: 'string', example: 'Silva' },
            cpf: { type: 'string', example: '39053344705' },
            email: { type: 'string', example: 'joao@email.com' },
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
    const { deliveryPerson } = await this.getDeliveryPerson.execute({
      deliveryPersonId,
    })

    return {
      deliveryPerson: DeliveryPersonPresenter.toHTTP(deliveryPerson),
    }
  }
}
