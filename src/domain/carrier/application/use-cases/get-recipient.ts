import { RecipientRepository } from '../repositories/recipient-repository'
import { RecipientDoesNotExistsError } from './errors/recipient-does-not-exists-error'

interface GetRecipientUseCaseRequest {
  recipientId: string
}

export class GetRecipientUseCase {
  constructor(private recipientRepository: RecipientRepository) {}

  async execute({ recipientId }: GetRecipientUseCaseRequest) {
    const recipient = await this.recipientRepository.findById(recipientId)

    if (!recipient) throw new RecipientDoesNotExistsError(recipientId)

    return recipient
  }
}
