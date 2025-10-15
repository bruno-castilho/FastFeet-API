import { HashGenerator } from '@/domain/users/application/cryptography/hash-generator'
import { DeliveryPersonRepository } from '../repositories/delivery-person-repository'
import { DeliveryPersonDoesNotExistsError } from './errors/delivery-person-does-not-exists-error'

interface ChangeDeliveryPersonPasswordUseCaseRequest {
  deliveryPersonId: string
  password: string
}

export class ChangeDeliveryPersonPasswordUseCase {
  constructor(
    private deliveryPersonRepository: DeliveryPersonRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    deliveryPersonId,
    password,
  }: ChangeDeliveryPersonPasswordUseCaseRequest) {
    const deliveryPerson =
      await this.deliveryPersonRepository.findById(deliveryPersonId)

    if (!deliveryPerson)
      throw new DeliveryPersonDoesNotExistsError(deliveryPersonId)

    const hashedPassword = await this.hashGenerator.hash(password)

    deliveryPerson.password = hashedPassword

    await this.deliveryPersonRepository.save(deliveryPerson)
  }
}
