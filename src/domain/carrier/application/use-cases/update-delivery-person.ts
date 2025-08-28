import { DeliveryPersonRepository } from '../repositories/delivery-person-repository'
import { DeliveryPersonDoesNotExistsError } from './errors/delivery-person-does-not-exists-error'
import { CPF } from '../../enterprise/entities/value-objects/cpf'
import { Email } from '../../enterprise/entities/value-objects/email'

interface UpdateDeliveryPersonUseCaseRequest {
  deliveryPersonId: string
  firstName: string
  lastName: string
  cpf: string
  email: string
}

export class UpdateDeliveryPersonUseCase {
  constructor(private deliveryPersonRepository: DeliveryPersonRepository) {}

  async execute({
    deliveryPersonId,
    firstName,
    lastName,
    cpf,
    email,
  }: UpdateDeliveryPersonUseCaseRequest) {
    const deliveryPerson =
      await this.deliveryPersonRepository.findById(deliveryPersonId)

    if (!deliveryPerson)
      throw new DeliveryPersonDoesNotExistsError(deliveryPersonId)

    deliveryPerson.firstName = firstName
    deliveryPerson.lastName = lastName
    deliveryPerson.cpf = CPF.create(cpf)
    deliveryPerson.email = Email.create(email)

    await this.deliveryPersonRepository.save(deliveryPerson)
  }
}
