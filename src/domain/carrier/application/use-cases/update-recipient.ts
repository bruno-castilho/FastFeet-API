import { CEP } from '../../enterprise/entities/value-objects/cep'
import { Email } from '../../enterprise/entities/value-objects/email'
import { Phone } from '../../enterprise/entities/value-objects/phone'
import { RecipientRepository } from '../repositories/recipient-repository'
import { RecipientDoesNotExistsError } from './errors/recipient-does-not-exists-error'

interface UpdateRecipientUseCaseRequest {
  recipientId: string
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

export class UpdateRecipientUseCase {
  constructor(private recipientRepository: RecipientRepository) {}

  async execute({
    recipientId,
    firstName,
    lastName,
    email,
    phone,
    cep,
    streetAddress,
    number,
    complement,
    city,
    country,
    neighborhood,
  }: UpdateRecipientUseCaseRequest) {
    const recipient = await this.recipientRepository.findById(recipientId)

    if (!recipient) throw new RecipientDoesNotExistsError(recipientId)

    recipient.firstName = firstName
    recipient.lastName = lastName
    recipient.email = Email.create(email)
    recipient.phone = Phone.create(phone)
    recipient.cep = CEP.create(cep)
    recipient.streetAddress = streetAddress
    recipient.number = number
    recipient.complement = complement ?? null
    recipient.city = city
    recipient.country = country
    recipient.neighborhood = neighborhood

    await this.recipientRepository.save(recipient)

    return recipient
  }
}
