import { FakeHasher } from 'test/cryptography/fake-hasher'
import { RegisterDeliveryPersonUseCase } from './register-delivery-person'
import { InMemoryDeliveryPersonRepository } from 'test/repositories/in-memory-delivery-person-repository'
import { makeDeliveryPerson } from 'test/factories/make-student'
import { CPF } from '../../enterprise/entities/value-objects/cpf'
import { CPFAlreadyExistsError } from './errors/cpf-already-exists-error'
import { Email } from '../../enterprise/entities/value-objects/email'
import { EmailAlreadyExistsError } from './errors/email-already-exists-error'

let inMemoryDeliveryPersonRepository: InMemoryDeliveryPersonRepository
let fakeHasher: FakeHasher

let sut: RegisterDeliveryPersonUseCase

describe('Register Delivery Person', () => {
  beforeEach(() => {
    inMemoryDeliveryPersonRepository = new InMemoryDeliveryPersonRepository()
    fakeHasher = new FakeHasher()

    sut = new RegisterDeliveryPersonUseCase(
      inMemoryDeliveryPersonRepository,
      fakeHasher,
    )
  })

  it('should be able to register a new delivery person', async () => {
    await sut.execute({
      name: 'John',
      last_name: 'Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cpf: '39053344705',
    })

    expect(inMemoryDeliveryPersonRepository.items).toHaveLength(1)
    expect(inMemoryDeliveryPersonRepository.items[0]).toEqual(
      expect.objectContaining({
        name: 'John',
        last_name: 'Doe',
      }),
    )
  })

  it('should not be able to register a delivery person with same email', async () => {
    const deliveryPerson = makeDeliveryPerson({
      email: Email.create('johndoe@example.com'),
    })

    await inMemoryDeliveryPersonRepository.create(deliveryPerson)

    await expect(() =>
      sut.execute({
        name: 'John',
        last_name: 'Doe',
        email: 'johndoe@example.com',
        password: '123456',
        cpf: '98765432100',
      }),
    ).rejects.toBeInstanceOf(EmailAlreadyExistsError)
  })

  it('should not be able to register a delivery person with same cpf', async () => {
    const deliveryPerson = makeDeliveryPerson({
      cpf: CPF.create('39053344705'),
    })

    await inMemoryDeliveryPersonRepository.create(deliveryPerson)

    await expect(() =>
      sut.execute({
        name: 'John',
        last_name: 'Doe',
        email: 'johndoe@example.com',
        password: '123456',
        cpf: '39053344705',
      }),
    ).rejects.toBeInstanceOf(CPFAlreadyExistsError)
  })
})
