import { InMemoryDeliveryPersonRepository } from 'test/repositories/in-memory-delivery-person-repository'
import { makeDeliveryPerson } from 'test/factories/make-delivery-person'
import { randomUUID } from 'node:crypto'
import { DeliveryPersonDoesNotExistsError } from './errors/delivery-person-does-not-exists-error'
import { ChangeDeliveryPersonPasswordUseCase } from './change-delivery-person-password'
import { FakeHasher } from 'test/cryptography/fake-hasher'

let inMemoryDeliveryPersonRepository: InMemoryDeliveryPersonRepository
let fakeHasher: FakeHasher

let sut: ChangeDeliveryPersonPasswordUseCase

describe('Update Delivery Person', () => {
  beforeEach(() => {
    inMemoryDeliveryPersonRepository = new InMemoryDeliveryPersonRepository()
    fakeHasher = new FakeHasher()

    sut = new ChangeDeliveryPersonPasswordUseCase(
      inMemoryDeliveryPersonRepository,
      fakeHasher,
    )
  })

  it('should be able to change delivery person password', async () => {
    const deliveryPerson = makeDeliveryPerson()

    await inMemoryDeliveryPersonRepository.create(deliveryPerson)

    await sut.execute({
      deliveryPersonId: deliveryPerson.id.toValue(),
      password: '123456',
    })

    const currentDeliveryPersonPassword =
      inMemoryDeliveryPersonRepository.items[0].password

    expect(currentDeliveryPersonPassword).toEqual(
      await fakeHasher.hash('123456'),
    )
  })

  it('should not be able to change delivery person password if the delivery person does not exists', async () => {
    const deliveryPersonId = randomUUID()

    await expect(() =>
      sut.execute({
        deliveryPersonId,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(DeliveryPersonDoesNotExistsError)
  })
})
