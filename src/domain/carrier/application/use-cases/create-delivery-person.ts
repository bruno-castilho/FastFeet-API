import { DeliveryPerson } from '../../enterprise/entities/delivery-person'
import { CPF } from '../../enterprise/entities/value-objects/cpf'
import { Email } from '../../enterprise/entities/value-objects/email'
import { HashGenerator } from '../cryptography/hash-generator'
import { DeliveryPersonRepository } from '../repositories/delivery-person-repository'
import { CPFAlreadyExistsError } from './errors/cpf-already-exists-error'
import { EmailAlreadyExistsError } from './errors/email-already-exists-error'

interface CreateDeliveryPersonUseCaseRequest {
  firstName: string
  lastName: string
  cpf: string
  email: string
  password: string
}

export class CreateDeliveryPersonUseCase {
  constructor(
    private deliveryPersonRepository: DeliveryPersonRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    firstName,
    lastName,
    cpf,
    email,
    password,
  }: CreateDeliveryPersonUseCaseRequest) {
    const deliveryPersonWithSameEmail =
      await this.deliveryPersonRepository.findByEmail(email)

    if (deliveryPersonWithSameEmail) {
      throw new EmailAlreadyExistsError(email)
    }

    const deliveryPersonWithSameCpf =
      await this.deliveryPersonRepository.findByCPF(cpf)

    if (deliveryPersonWithSameCpf) {
      throw new CPFAlreadyExistsError(cpf)
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const deliveryPerson = DeliveryPerson.create({
      firstName,
      lastName,
      cpf: CPF.create(cpf),
      email: Email.create(email),
      password: hashedPassword,
    })

    await this.deliveryPersonRepository.create(deliveryPerson)
  }
}
