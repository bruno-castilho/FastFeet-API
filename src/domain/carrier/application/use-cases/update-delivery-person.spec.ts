import { InMemoryDeliveryPersonRepository } from 'test/repositories/in-memory-delivery-person-repository'
import { UpdateDeliveryPersonUseCase } from './update-delivery-person'
import { makeDeliveryPerson } from 'test/factories/make-delivery-person'
import { randomUUID } from 'node:crypto'
import { DeliveryPersonDoesNotExistsError } from './errors/delivery-person-does-not-exists-error'

let inMemoryDeliveryPersonRepository: InMemoryDeliveryPersonRepository

let sut: UpdateDeliveryPersonUseCase

describe('Update Delivery Person', () => {
  beforeEach(() => {
    inMemoryDeliveryPersonRepository = new InMemoryDeliveryPersonRepository()

    sut = new UpdateDeliveryPersonUseCase(inMemoryDeliveryPersonRepository)
  })

  it('should be able to update a delivery person', async () => {
    const deliveryPerson = makeDeliveryPerson()

    await inMemoryDeliveryPersonRepository.create(deliveryPerson)

    await sut.execute({
      deliveryPersonId: deliveryPerson.id.toValue(),
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
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

  it('should not be able to update a delivery person if the delivery person does not exists', async () => {
    const deliveryPersonId = randomUUID()

    await expect(() =>
      sut.execute({
        deliveryPersonId,
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        cpf: '39053344705',
      }),
    ).rejects.toBeInstanceOf(DeliveryPersonDoesNotExistsError)
  })
})
