import { FakeEncrypter } from 'test/cryptography/fake-encrypter'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { InMemoryDeliveryPersonRepository } from 'test/repositories/in-memory-delivery-person-repository'
import { AuthenticateDeliveryPersonUseCase } from './authenticate-delivery-person'
import { makeDeliveryPerson } from 'test/factories/make-delivery-person'
import { WrongCredentialsError } from './errors/wrong-credentials-error'

let inMemoryDeliveryPersonRepository: InMemoryDeliveryPersonRepository
let fakeHasher: FakeHasher
let encrypter: FakeEncrypter

let sut: AuthenticateDeliveryPersonUseCase

describe('Authenticate Delivery Person', () => {
  beforeEach(() => {
    inMemoryDeliveryPersonRepository = new InMemoryDeliveryPersonRepository()
    fakeHasher = new FakeHasher()
    encrypter = new FakeEncrypter()

    sut = new AuthenticateDeliveryPersonUseCase(
      inMemoryDeliveryPersonRepository,
      fakeHasher,
      encrypter,
    )
  })

  it('should be able to authenticate a delivery person', async () => {
    const deliveryPerson = makeDeliveryPerson({
      password: await fakeHasher.hash('123456'),
    })

    inMemoryDeliveryPersonRepository.items.push(deliveryPerson)

    const { accessToken } = await sut.execute({
      cpf: deliveryPerson.cpf.value,
      password: '123456',
    })

    expect(accessToken).toEqual(expect.any(String))
  })

  it('should not be able to authenticate a delivery person if cpf does not exists', async () => {
    const deliveryPerson = makeDeliveryPerson({
      password: await fakeHasher.hash('123456'),
    })

    inMemoryDeliveryPersonRepository.items.push(deliveryPerson)

    await expect(() =>
      sut.execute({
        cpf: '000.000.000-55',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(WrongCredentialsError)
  })

  it('should not be able to authenticate a delivery person with wrong password', async () => {
    const deliveryPerson = makeDeliveryPerson({
      password: await fakeHasher.hash('123456'),
    })

    inMemoryDeliveryPersonRepository.items.push(deliveryPerson)

    await expect(() =>
      sut.execute({
        cpf: deliveryPerson.cpf.value,
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(WrongCredentialsError)
  })
})
