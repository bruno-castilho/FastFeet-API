import { InMemoryRecipientRepository } from 'test/repositories/in-memory-recipient-repository'
import { CreateRecipientUseCase } from './create-recipient'
import { FakeGeolocation } from 'test/cep/fake-geolocation'
import { InvalidCEP } from './errors/invalid-cep-error'

let inMemoryRecipientRepository: InMemoryRecipientRepository
let fakeGeolocation: FakeGeolocation

let sut: CreateRecipientUseCase

describe('Create Recipient', () => {
  beforeEach(() => {
    inMemoryRecipientRepository = new InMemoryRecipientRepository()
    fakeGeolocation = new FakeGeolocation()

    sut = new CreateRecipientUseCase(
      inMemoryRecipientRepository,
      fakeGeolocation,
    )
  })

  it('should be able to create a new recipient', async () => {
    await sut.execute({
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      cep: '10000-000',
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

  it('should not be able to create a new recipient with invalid cep', async () => {
    await expect(() =>
      sut.execute({
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
    ).rejects.toBeInstanceOf(InvalidCEP)
  })
})
