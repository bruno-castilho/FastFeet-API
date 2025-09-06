import { RemoveDeliveryPerson } from '@/infra/use-cases/carrier/remove-delivery-person'
import { Controller, Delete, Param } from '@nestjs/common'

@Controller('/deliveryperson/:deliveryPersonId')
export class RemoveDeliveryPersonController {
  constructor(private removeDeliveryPerson: RemoveDeliveryPerson) {}

  @Delete()
  async handle(@Param('deliveryPersonId') deliveryPersonId: string) {
    await this.removeDeliveryPerson.execute({
      deliveryPersonId,
    })

    return {
      message: 'Entregador removido com sucesso!',
    }
  }
}
