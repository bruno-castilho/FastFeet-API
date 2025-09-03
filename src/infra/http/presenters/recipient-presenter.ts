import { Recipient } from '@/domain/carrier/enterprise/entities/recipient'

export class RecipientPresenter {
  static toHTTP(recipient: Recipient) {
    return {
      id: recipient.id.toValue(),
      firstName: recipient.firstName,
      lastName: recipient.lastName,
      email: recipient.email.value,
      phone: recipient.phone.value,
      cep: recipient.cep.value,
      streetAddress: recipient.streetAddress,
      number: recipient.number,
      complement: recipient.complement,
      neighborhood: recipient.neighborhood,
      city: recipient.city,
      state: recipient.state,
      country: recipient.country,
      latitude: recipient.latitude,
      longitude: recipient.longitude,
    }
  }
}
