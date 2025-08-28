import { DeliveryPersonRepository } from '../repositories/delivery-person-repository'
import { DeliveryPersonDoesNotExistsError } from './errors/delivery-person-does-not-exists-error'

interface RemoveDeliveryPersonUseCaseRequest {
  deliveryPersonId: string
}

export class RemoveDeliveryPersonUseCase {
  constructor(private deliveryPersonRepository: DeliveryPersonRepository) {}

  async execute({ deliveryPersonId }: RemoveDeliveryPersonUseCaseRequest) {
    const deliverPerson =
      await this.deliveryPersonRepository.findById(deliveryPersonId)

    if (!deliverPerson)
      throw new DeliveryPersonDoesNotExistsError(deliveryPersonId)

    await this.deliveryPersonRepository.delete(deliverPerson)
  }
}
