import { DeliveryPersonRepository } from '../repositories/delivery-person-repository'
import { DeliveryPersonDoesNotExistsError } from './errors/delivery-person-does-not-exists-error'

interface GetDeliveryPersonUseCaseRequest {
  deliveryPersonId: string
}

export class GetDeliveryPersonUseCase {
  constructor(private deliverypersonRepository: DeliveryPersonRepository) {}

  async execute({ deliveryPersonId }: GetDeliveryPersonUseCaseRequest) {
    const deliveryPerson =
      await this.deliverypersonRepository.findById(deliveryPersonId)

    if (!deliveryPerson)
      throw new DeliveryPersonDoesNotExistsError(deliveryPersonId)

    return { deliveryPerson }
  }
}
