import { DeliveryPersonRepository } from '../repositories/delivery-person-repository'
import { DeliveryPersonDoesNotExistsError } from './errors/delivery-person-does-not-exists-error'

interface GetDeliveryPersonUseCaseRequest {
  deliverypersonId: string
}

export class GetDeliveryPersonUseCase {
  constructor(private deliverypersonRepository: DeliveryPersonRepository) {}

  async execute({ deliverypersonId }: GetDeliveryPersonUseCaseRequest) {
    const deliveryPerson =
      await this.deliverypersonRepository.findById(deliverypersonId)

    if (!deliveryPerson)
      throw new DeliveryPersonDoesNotExistsError(deliverypersonId)

    return deliveryPerson
  }
}
