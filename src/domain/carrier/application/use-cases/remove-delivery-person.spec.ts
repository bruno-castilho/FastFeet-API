import { InMemoryDeliveryPersonRepository } from 'test/repositories/in-memory-delivery-person-repository'
import { RemoveDeliveryPersonUseCase } from './remove-delivery-person'
import { makeDeliveryPerson } from 'test/factories/make-delivery-person'
import { DeliveryPersonDoesNotExistsError } from './errors/delivery-person-does-not-exists-error'

let inMemoryDeliveryPersonRepository: InMemoryDeliveryPersonRepository

let sut: RemoveDeliveryPersonUseCase

describe('Remove Delivery Person', () => {
  beforeEach(() => {
    inMemoryDeliveryPersonRepository = new InMemoryDeliveryPersonRepository()

    sut = new RemoveDeliveryPersonUseCase(inMemoryDeliveryPersonRepository)
  })

  it('should be able to remove a delivery person', async () => {
    const pckg = makeDeliveryPerson()

    await inMemoryDeliveryPersonRepository.create(pckg)

    await sut.execute({ deliveryPersonId: pckg.id.toValue() })

    expect(inMemoryDeliveryPersonRepository.items).toHaveLength(0)
  })

  it('should not be able to remove a deliveryperson if the delivery person does not exists', async () => {
    await expect(() =>
      sut.execute({
        deliveryPersonId: '1',
      }),
    ).rejects.toBeInstanceOf(DeliveryPersonDoesNotExistsError)
  })
})
