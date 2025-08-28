import { RecipientRepository } from '@/domain/carrier/application/repositories/recipient-repository'
import { Recipient } from '@/domain/carrier/enterprise/entities/recipient'

export class InMemoryRecipientRepository implements RecipientRepository {
  public items: Recipient[] = []

  async create(recipient: Recipient): Promise<void> {
    this.items.push(recipient)
  }
}
