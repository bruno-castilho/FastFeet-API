import { InMemoryRecipientRepository } from 'test/repositories/in-memory-recipient-repository'
import { GetRecipientUseCase } from './get-recipient'
import { RecipientDoesNotExistsError } from './errors/recipient-does-not-exists-error'
import { makeRecipient } from 'test/factories/make-recipient'

let inMemoryRecipientRepository: InMemoryRecipientRepository

let sut: GetRecipientUseCase

describe('Get Recipient', () => {
  beforeEach(() => {
    inMemoryRecipientRepository = new InMemoryRecipientRepository()

    sut = new GetRecipientUseCase(inMemoryRecipientRepository)
  })

  it('should be able to get a recipient', async () => {
    const recipient = makeRecipient()

    await inMemoryRecipientRepository.create(recipient)

    const result = await sut.execute({ recipientId: recipient.id.toValue() })

    expect(result.recipient).toEqual(recipient)
  })

  it('should not be able to get a recipient if the recipient does not exists', async () => {
    await expect(() =>
      sut.execute({
        recipientId: '1',
      }),
    ).rejects.toBeInstanceOf(RecipientDoesNotExistsError)
  })
})
