import { InMemoryRecipientRepository } from 'test/repositories/in-memory-recipient-repository'
import { makeRecipient } from 'test/factories/make-recipient'
import { UpdateRecipientUseCase } from './update-recipient'
import { randomUUID } from 'crypto'
import { RecipientDoesNotExistsError } from './errors/recipient-does-not-exists-error'

let inMemoryRecipientRepository: InMemoryRecipientRepository

let sut: UpdateRecipientUseCase

describe('Update Recipient', () => {
  beforeEach(() => {
    inMemoryRecipientRepository = new InMemoryRecipientRepository()

    sut = new UpdateRecipientUseCase(inMemoryRecipientRepository)
  })

  it('should be able to update a recipient', async () => {
    const recipient = makeRecipient()

    await inMemoryRecipientRepository.create(recipient)

    await sut.execute({
      recipientId: recipient.id.toValue(),
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      cep: '00000-000',
      city: 'Florianopólis',
      country: 'Brasil',
      neighborhood: 'Lago da Conceição',
      number: 0,
      phone: '(00) 00000-0000',
      state: 'Santa Catarina',
      streetAddress: 'Rua dos Bobos',
    })

    expect(inMemoryRecipientRepository.items).toHaveLength(1)
    expect(inMemoryRecipientRepository.items[0]).toEqual(
      expect.objectContaining({
        firstName: 'John',
        lastName: 'Doe',
      }),
    )
  })

  it('should not be able to update a recipient if the recipient does not exists', async () => {
    const recipientId = randomUUID()

    await expect(() =>
      sut.execute({
        recipientId,
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        cep: '00000-000',
        city: 'Florianopólis',
        country: 'Brasil',
        neighborhood: 'Lago da Conceição',
        number: 0,
        phone: '(00) 00000-0000',
        state: 'Santa Catarina',
        streetAddress: 'Rua dos Bobos',
      }),
    ).rejects.toBeInstanceOf(RecipientDoesNotExistsError)
  })
})
