import { CEP } from '../../../../core/entities/value-objects/cep'
import { Email } from '../../../../core/entities/value-objects/email'
import { Phone } from '../../../../core/entities/value-objects/phone'
import { GeolocationCEP } from '../cep/geolocation-cep'
import { RecipientRepository } from '../repositories/recipient-repository'
import { InvalidCEPError } from './errors/invalid-cep-error'
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
  constructor(
    private recipientRepository: RecipientRepository,
    private geolocationCEP: GeolocationCEP,
  ) {}

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
    state,
    country,
    neighborhood,
  }: UpdateRecipientUseCaseRequest) {
    const recipient = await this.recipientRepository.findById(recipientId)

    if (!recipient) throw new RecipientDoesNotExistsError(recipientId)

    const geolocation = await this.geolocationCEP.getCoordinates(cep)

    if (!geolocation) throw new InvalidCEPError()

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
    recipient.latitude = geolocation.latitude
    recipient.longitude = geolocation.longitude
    recipient.state = state

    await this.recipientRepository.save(recipient)

    return recipient
  }
}
