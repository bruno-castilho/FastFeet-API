import { RecipientRepository } from '../repositories/recipient-repository'
import { RecipientDoesNotExistsError } from './errors/recipient-does-not-exists-error'

interface RemoveRecipientUseCaseRequest {
  recipientId: string
}

export class RemoveRecipientUseCase {
  constructor(private recipientRepository: RecipientRepository) {}

  async execute({ recipientId }: RemoveRecipientUseCaseRequest) {
    const recipient = await this.recipientRepository.findById(recipientId)

    if (!recipient) throw new RecipientDoesNotExistsError(recipientId)

    await this.recipientRepository.delete(recipient)
  }
}
