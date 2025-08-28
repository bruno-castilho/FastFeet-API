import { InMemoryPackageRepository } from 'test/repositories/in-memory-package-repository'
import { makePackage } from 'test/factories/make-package'
import { randomUUID } from 'crypto'
import { PackageDoesNotExistsError } from './errors/package-does-not-exists-error'
import { State } from '../../enterprise/entities/package'
import { MarkPackageAsPickedUpUseCase } from './mark-package-as-picked-up'
import { makeDeliveryPerson } from 'test/factories/make-delivery-person'
import { InMemoryDeliveryPersonRepository } from 'test/repositories/in-memory-delivery-person-repository'
import { DeliveryPersonDoesNotExistsError } from './errors/delivery-person-does-not-exists-error'

let inMemoryPackageRepository: InMemoryPackageRepository
let inMemoryDeliveryPersonRepository: InMemoryDeliveryPersonRepository

let sut: MarkPackageAsPickedUpUseCase

describe('Mark Package as PickedUp', () => {
  beforeEach(() => {
    inMemoryPackageRepository = new InMemoryPackageRepository()
    inMemoryDeliveryPersonRepository = new InMemoryDeliveryPersonRepository()

    sut = new MarkPackageAsPickedUpUseCase(
      inMemoryPackageRepository,
      inMemoryDeliveryPersonRepository,
    )
  })

  it('should be able to mark an package as picked up', async () => {
    const pckg = makePackage()

    await inMemoryPackageRepository.create(pckg)

    const deliveryPerson = makeDeliveryPerson()

    await inMemoryDeliveryPersonRepository.create(deliveryPerson)

    await sut.execute({
      packageId: pckg.id.toValue(),
      deliveryPersonId: deliveryPerson.id.toValue(),
    })

    expect(inMemoryPackageRepository.items[0]).toEqual(
      expect.objectContaining({
        state: State.PICKEDUP,
      }),
    )
  })

  it('should not be able to mark an package as picked up if the package does not exists', async () => {
    const packageId = randomUUID()

    const deliveryPerson = makeDeliveryPerson()

    await inMemoryDeliveryPersonRepository.create(deliveryPerson)

    await expect(() =>
      sut.execute({
        packageId,
        deliveryPersonId: deliveryPerson.id.toValue(),
      }),
    ).rejects.toBeInstanceOf(PackageDoesNotExistsError)
  })

  it('should not be able to mark an package as picked up if the delivery person does not exists', async () => {
    const pckg = makePackage()

    await inMemoryPackageRepository.create(pckg)

    const deliveryPersonId = randomUUID()

    await expect(() =>
      sut.execute({
        packageId: pckg.id.toValue(),
        deliveryPersonId,
      }),
    ).rejects.toBeInstanceOf(DeliveryPersonDoesNotExistsError)
  })
})
