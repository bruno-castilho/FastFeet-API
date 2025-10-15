import { Recipient } from '../../enterprise/entities/recipient'
import { CEP } from '../../../../core/entities/value-objects/cep'
import { Email } from '../../../../core/entities/value-objects/email'
import { Phone } from '../../../../core/entities/value-objects/phone'
import { GeolocationCEP } from '../cep/geolocation-cep'
import { RecipientRepository } from '../repositories/recipient-repository'
import { InvalidCEPError } from './errors/invalid-cep-error'

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
  constructor(
    private recipientRepository: RecipientRepository,
    private geolocationCEP: GeolocationCEP,
  ) {}

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
    const geolocation = await this.geolocationCEP.getCoordinates(cep)

    if (!geolocation) throw new InvalidCEPError()

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
      latitude: geolocation.latitude,
      longitude: geolocation.longitude,
    })

    await this.recipientRepository.create(recipient)
  }
}
