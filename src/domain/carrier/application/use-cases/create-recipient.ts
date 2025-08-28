import { Recipient } from '../../enterprise/entities/recipient'
import { CEP } from '../../enterprise/entities/value-objects/cep'
import { Email } from '../../enterprise/entities/value-objects/email'
import { Phone } from '../../enterprise/entities/value-objects/phone'
import { RecipientRepository } from '../repositories/recipient-repository'

interface CreateRecipientUseCaseRequest {
  firstName: string
  lastName: string
  email: string
  phone: string
  cep: string
  streetAddress: string
  number: number
  complement?: string
  neighborhood: string
  city: string
  state: string
  country: string
}

export class CreateRecipientUseCase {
  constructor(private recipientRepository: RecipientRepository) {}

  async execute({
    firstName,
    lastName,
    email,
    phone,
    cep,
    city,
    country,
    neighborhood,
    number,
    state,
    streetAddress,
    complement,
  }: CreateRecipientUseCaseRequest) {
    const recipient = Recipient.create({
      firstName,
      lastName,
      city,
      country,
      neighborhood,
      number,
      state,
      streetAddress,
      complement,
      email: Email.create(email),
      cep: CEP.create(cep),
      phone: Phone.create(phone),
    })

    this.recipientRepository.create(recipient)
  }
}
