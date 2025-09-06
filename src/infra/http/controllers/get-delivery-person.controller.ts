import { GetDeliveryPerson } from '@/infra/use-cases/carrier/get-delivery-person'
import { Controller, Get, Param } from '@nestjs/common'
import { DeliveryPersonPresenter } from '../presenters/deliver-person-presenter'

@Controller('/deliveryperson/:deliveryPersonId')
export class GetDeliveryPersonController {
  constructor(private getDeliveryPerson: GetDeliveryPerson) {}

  @Get()
  async handle(@Param('deliveryPersonId') deliveryPersonId: string) {
    const { deliveryPerson } = await this.getDeliveryPerson.execute({
      deliveryPersonId,
    })

    return {
      deliveryPerson: DeliveryPersonPresenter.toHTTP(deliveryPerson),
    }
  }
}
