import { InMemoryPackageRepository } from 'test/repositories/in-memory-package-repository'
import { FetchPackageByDeliveryPersonUseCase } from './fetch-package-by-delivery-person'
import { makePackage } from 'test/factories/make-package'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryPackageRepository: InMemoryPackageRepository
let sut: FetchPackageByDeliveryPersonUseCase

describe('Fetch Package By Delivery Person', () => {
  beforeEach(() => {
    inMemoryPackageRepository = new InMemoryPackageRepository()

    sut = new FetchPackageByDeliveryPersonUseCase(inMemoryPackageRepository)
  })

  it('should be able to fetch package by delivery person', async () => {
    const package1 = makePackage({
      deliveredBy: new UniqueEntityID('delivery-person-1'),
    })

    const package2 = makePackage({
      deliveredBy: new UniqueEntityID('delivery-person-1'),
    })

    const package3 = makePackage({
      deliveredBy: new UniqueEntityID('delivery-person-1'),
    })

    await inMemoryPackageRepository.create(package1)
    await inMemoryPackageRepository.create(package2)
    await inMemoryPackageRepository.create(package3)

    const result = await sut.execute({
      deliveryPersonId: 'delivery-person-1',
      page: 1,
    })

    expect(result.packages).toHaveLength(3)
    expect(result.packages).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          weightInGrams: package1.weightInGrams,
          heightInCentimeters: package1.heightInCentimeters,
          widthInCentimeters: package1.widthInCentimeters,
          recipientId: package1.recipientId,
          state: package1.state,
          deliveredBy: new UniqueEntityID('delivery-person-1'),
        }),
        expect.objectContaining({
          weightInGrams: package2.weightInGrams,
          heightInCentimeters: package2.heightInCentimeters,
          widthInCentimeters: package2.widthInCentimeters,
          recipientId: package2.recipientId,
          state: package2.state,
          deliveredBy: new UniqueEntityID('delivery-person-1'),
        }),
        expect.objectContaining({
          weightInGrams: package3.weightInGrams,
          heightInCentimeters: package3.heightInCentimeters,
          widthInCentimeters: package3.widthInCentimeters,
          recipientId: package3.recipientId,
          state: package3.state,
          deliveredBy: new UniqueEntityID('delivery-person-1'),
        }),
      ]),
    )
  })

  it('should be able to fetch paginated package by delivery person', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryPackageRepository.create(
        makePackage({
          deliveredBy: new UniqueEntityID('delivery-person-1'),
        }),
      )
    }

    const result = await sut.execute({
      deliveryPersonId: 'delivery-person-1',
      page: 2,
    })

    expect(result.packages).toHaveLength(2)
  })
})
