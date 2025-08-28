import { FakeHasher } from 'test/cryptography/fake-hasher'
import { CreateDeliveryPersonUseCase } from './create-delivery-person'
import { InMemoryDeliveryPersonRepository } from 'test/repositories/in-memory-delivery-person-repository'
import { CPFAlreadyExistsError } from './errors/cpf-already-exists-error'
import { EmailAlreadyExistsError } from './errors/email-already-exists-error'
import { makeDeliveryPerson } from 'test/factories/make-delivery-person'

let inMemoryDeliveryPersonRepository: InMemoryDeliveryPersonRepository
let fakeHasher: FakeHasher

let sut: CreateDeliveryPersonUseCase

describe('Create Delivery Person', () => {
  beforeEach(() => {
    inMemoryDeliveryPersonRepository = new InMemoryDeliveryPersonRepository()
    fakeHasher = new FakeHasher()

    sut = new CreateDeliveryPersonUseCase(
      inMemoryDeliveryPersonRepository,
      fakeHasher,
    )
  })

  it('should be able to create a new delivery person', async () => {
    await sut.execute({
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cpf: '39053344705',
    })

    expect(inMemoryDeliveryPersonRepository.items).toHaveLength(1)
    expect(inMemoryDeliveryPersonRepository.items[0]).toEqual(
      expect.objectContaining({
        firstName: 'John',
        lastName: 'Doe',
      }),
    )
  })

  it('should not be able to create a delivery person with same email', async () => {
    const deliveryPerson = makeDeliveryPerson()

    await inMemoryDeliveryPersonRepository.create(deliveryPerson)

    await expect(() =>
      sut.execute({
        firstName: 'John',
        lastName: 'Doe',
        email: deliveryPerson.email.value,
        password: '123456',
        cpf: '98765432100',
      }),
    ).rejects.toBeInstanceOf(EmailAlreadyExistsError)
  })

  it('should not be able to create a delivery person with same cpf', async () => {
    const deliveryPerson = makeDeliveryPerson()

    await inMemoryDeliveryPersonRepository.create(deliveryPerson)

    await expect(() =>
      sut.execute({
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        password: '123456',
        cpf: deliveryPerson.cpf.value,
      }),
    ).rejects.toBeInstanceOf(CPFAlreadyExistsError)
  })
})
