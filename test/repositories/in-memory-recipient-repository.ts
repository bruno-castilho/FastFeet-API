import { RecipientRepository } from '@/domain/carrier/application/repositories/recipient-repository'
import { Recipient } from '@/domain/carrier/enterprise/entities/recipient'

export class InMemoryRecipientRepository implements RecipientRepository {
  public items: Recipient[] = []

  async findById(id: string) {
    const recipient = this.items.find((item) => item.id.toValue() === id)

    if (!recipient) {
      return null
    }

    return recipient
  }

  async create(recipient: Recipient) {
    this.items.push(recipient)
  }
}
