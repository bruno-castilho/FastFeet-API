import { GetDeliveryPerson } from '@/infra/use-cases/carrier/get-delivery-person'
import { Controller, Get, Param } from '@nestjs/common'
import { DeliveryPersonPresenter } from '../../presenters/deliver-person-presenter'
import { GetDeliveryPersonDocs } from './docs/get-delivery-person.docs'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Deliveryperson')
@Controller('/deliveryperson/:deliveryPersonId')
export class GetDeliveryPersonController {
  constructor(private getDeliveryPerson: GetDeliveryPerson) {}

  @Get()
  @GetDeliveryPersonDocs()
  async handle(@Param('deliveryPersonId') deliveryPersonId: string) {
    const { deliveryPerson } = await this.getDeliveryPerson.execute({
      deliveryPersonId,
    })

    return {
      deliveryPerson: DeliveryPersonPresenter.toHTTP(deliveryPerson),
    }
  }
}
