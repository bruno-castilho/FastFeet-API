import { InMemoryRecipientRepository } from 'test/repositories/in-memory-recipient-repository'
import { RemoveRecipientUseCase } from './remove-recipient'
import { RecipientDoesNotExistsError } from './errors/recipient-does-not-exists-error'
import { makeRecipient } from 'test/factories/make-recipient'

let inMemoryRecipientRepository: InMemoryRecipientRepository

let sut: RemoveRecipientUseCase

describe('Remove Recipient', () => {
  beforeEach(() => {
    inMemoryRecipientRepository = new InMemoryRecipientRepository()

    sut = new RemoveRecipientUseCase(inMemoryRecipientRepository)
  })

  it('should be able to remove a recipient', async () => {
    const pckg = makeRecipient()

    await inMemoryRecipientRepository.create(pckg)

    await sut.execute({ recipientId: pckg.id.toValue() })

    expect(inMemoryRecipientRepository.items).toHaveLength(0)
  })

  it('should not be able to remove a recipient if the recipient does not exists', async () => {
    await expect(() =>
      sut.execute({
        recipientId: '1',
      }),
    ).rejects.toBeInstanceOf(RecipientDoesNotExistsError)
  })
})
