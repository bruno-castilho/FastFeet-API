import { DeliveryPersonRepository } from '@/domain/carrier/application/repositories/delivery-person-repository'
import { DeliveryPerson } from '@/domain/carrier/enterprise/entities/delivery-person'

export class InMemoryDeliveryPersonRepository
  implements DeliveryPersonRepository
{
  public items: DeliveryPerson[] = []

  async findById(id: string) {
    const pckg = this.items.find((item) => item.id.toValue() === id)

    if (!pckg) {
      return null
    }

    return pckg
  }

  async findByEmail(email: string) {
    const deliveryPerson = this.items.find((item) => item.email.value === email)

    if (!deliveryPerson) {
      return null
    }

    return deliveryPerson
  }

  async findByCPF(cpf: string) {
    const deliveryPerson = this.items.find((item) => item.cpf.value === cpf)

    if (!deliveryPerson) {
      return null
    }

    return deliveryPerson
  }

  async create(deliveryPerson: DeliveryPerson): Promise<void> {
    this.items.push(deliveryPerson)
  }

  async save(deliveryPerson: DeliveryPerson) {
    const itemIndex = this.items.findIndex(
      (item) => item.id === deliveryPerson.id,
    )

    this.items[itemIndex] = deliveryPerson
  }
}
