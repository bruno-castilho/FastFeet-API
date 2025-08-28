import { Recipient } from '../../enterprise/entities/recipient'
import { CEP } from '../../enterprise/entities/value-objects/cep'
import { Email } from '../../enterprise/entities/value-objects/email'
import { Phone } from '../../enterprise/entities/value-objects/phone'
import { RecipientRepository } from '../repositories/recipient-repository'

interface CreateRecipientUseCaseRequest {
  name: string
  last_name: string
  email: string
  phone: string
  cep: string
  street_address: string
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
    name,
    last_name,
    email,
    phone,
    cep,
    city,
    country,
    neighborhood,
    number,
    state,
    street_address,
    complement,
  }: CreateRecipientUseCaseRequest) {
    const recipient = Recipient.create({
      name,
      last_name,
      city,
      country,
      neighborhood,
      number,
      state,
      street_address,
      complement,
      email: Email.create(email),
      cep: CEP.create(cep),
      phone: Phone.create(phone),
    })

    this.recipientRepository.create(recipient)
  }
}
