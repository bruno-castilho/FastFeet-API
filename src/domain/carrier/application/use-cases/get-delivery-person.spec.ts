import { InMemoryDeliveryPersonRepository } from 'test/repositories/in-memory-delivery-person-repository'
import { GetDeliveryPersonUseCase } from './get-delivery-person'
import { DeliveryPersonDoesNotExistsError } from './errors/delivery-person-does-not-exists-error'
import { makeDeliveryPerson } from 'test/factories/make-delivery-person'

let inMemoryDeliveryPersonRepository: InMemoryDeliveryPersonRepository

let sut: GetDeliveryPersonUseCase

describe('Get DeliveryPerson', () => {
  beforeEach(() => {
    inMemoryDeliveryPersonRepository = new InMemoryDeliveryPersonRepository()

    sut = new GetDeliveryPersonUseCase(inMemoryDeliveryPersonRepository)
  })

  it('should be able to get a deliveryperson', async () => {
    const deliveryPerson = makeDeliveryPerson()

    await inMemoryDeliveryPersonRepository.create(deliveryPerson)

    const result = await sut.execute({
      deliverypersonId: deliveryPerson.id.toValue(),
    })

    expect(result).toEqual(deliveryPerson)
  })

  it('should not be able to get a deliveryperson if the deliveryperson does not exists', async () => {
    await expect(() =>
      sut.execute({
        deliverypersonId: '1',
      }),
    ).rejects.toBeInstanceOf(DeliveryPersonDoesNotExistsError)
  })
})
