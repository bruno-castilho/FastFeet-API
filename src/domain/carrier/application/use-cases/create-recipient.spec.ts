import { InMemoryRecipientRepository } from 'test/repositories/in-memory-recipient-repository'
import { CreateRecipientUseCase } from './create-recipient'

let inMemoryRecipientRepository: InMemoryRecipientRepository

let sut: CreateRecipientUseCase

describe('Create Recipient', () => {
  beforeEach(() => {
    inMemoryRecipientRepository = new InMemoryRecipientRepository()

    sut = new CreateRecipientUseCase(inMemoryRecipientRepository)
  })

  it('should be able to create a new recipient', async () => {
    await sut.execute({
      name: 'John',
      last_name: 'Doe',
      email: 'johndoe@example.com',
      cep: '00000-000',
      city: 'Florianopólis',
      country: 'Brasil',
      neighborhood: 'Lago da Conceição',
      number: 0,
      phone: '(00) 00000-0000',
      state: 'Santa Catarina',
      street_address: 'Rua dos Bobos',
    })

    expect(inMemoryRecipientRepository.items).toHaveLength(1)
    expect(inMemoryRecipientRepository.items[0]).toEqual(
      expect.objectContaining({
        name: 'John',
        last_name: 'Doe',
      }),
    )
  })
})
