import { DeliveryPerson } from '@/domain/carrier/enterprise/entities/delivery-person'

export class DeliveryPersonPresenter {
  static toHTTP(deliveryPerson: DeliveryPerson) {
    return {
      id: deliveryPerson.id.toValue(),
      firstName: deliveryPerson.firstName,
      lastName: deliveryPerson.lastName,
      cpf: deliveryPerson.cpf.value,
      email: deliveryPerson.email.value,
    }
  }
}
