import { InMemoryPackageRepository } from 'test/repositories/in-memory-package-repository'
import { makePackage } from 'test/factories/make-package'
import { randomUUID } from 'crypto'
import { PackageDoesNotExistsError } from './errors/package-does-not-exists-error'
import { MarkPackageAsDeliveredUseCase } from './mark-package-as-delivered'
import { InMemoryPhotoDeliveredPackageRepository } from 'test/repositories/in-memory-photo-delivered-package-repository'
import { makePhotoDeliveredPackage } from 'test/factories/make-photo-delivered-package'
import { PhotoDeliveredPackageDoesNotExistsError } from './errors/photo-delivered-package-does-not-exists-error'
import { makeDeliveryPerson } from 'test/factories/make-delivery-person'
import { DeliveryPersonIsNotPickedUpThePackageError } from './errors/delivery-person-is-not-picked-up-the-package-error'

let inMemoryPackageRepository: InMemoryPackageRepository
let inMemoryPhotoDeliveredPackageRepository: InMemoryPhotoDeliveredPackageRepository

let sut: MarkPackageAsDeliveredUseCase

describe('Mark Package as Delivered', () => {
  beforeEach(() => {
    inMemoryPackageRepository = new InMemoryPackageRepository()
    inMemoryPhotoDeliveredPackageRepository =
      new InMemoryPhotoDeliveredPackageRepository()

    sut = new MarkPackageAsDeliveredUseCase(
      inMemoryPackageRepository,
      inMemoryPhotoDeliveredPackageRepository,
    )
  })

  it('should be able to mark an package as delivered', async () => {
    const deliveryPerson = makeDeliveryPerson()

    const pckg = makePackage({
      deliveredBy: deliveryPerson.id,
    })

    await inMemoryPackageRepository.create(pckg)

    const photoDeliveredPackage = makePhotoDeliveredPackage()

    await inMemoryPhotoDeliveredPackageRepository.create(photoDeliveredPackage)

    await sut.execute({
      packageId: pckg.id.toValue(),
      deliveryPersonId: deliveryPerson.id.toString(),
      photoDeliveredPackageId: photoDeliveredPackage.id.toValue(),
    })

    expect(inMemoryPackageRepository.items[0]).toEqual(
      expect.objectContaining({
        state: 'DELIVERED',
        deliveredAt: expect.any(Date),
      }),
    )
  })

  it('should not be able to mark an package as delivered if the package does not exists', async () => {
    const packageId = randomUUID()

    const photoDeliveredPackageId = makePhotoDeliveredPackage()

    await expect(() =>
      sut.execute({
        packageId,
        deliveryPersonId: '2',
        photoDeliveredPackageId: photoDeliveredPackageId.id.toString(),
      }),
    ).rejects.toBeInstanceOf(PackageDoesNotExistsError)
  })

  it('should not be able to mark a package as delivered if the delivery person is not the one who picked up the package', async () => {
    const deliveryPerson = makeDeliveryPerson()

    const pckg = makePackage({
      deliveredBy: deliveryPerson.id,
    })

    await inMemoryPackageRepository.create(pckg)

    const photoDeliveredPackage = makePhotoDeliveredPackage()

    await inMemoryPhotoDeliveredPackageRepository.create(photoDeliveredPackage)

    await expect(() =>
      sut.execute({
        packageId: pckg.id.toValue(),
        deliveryPersonId: randomUUID(),
        photoDeliveredPackageId: photoDeliveredPackage.id.toValue(),
      }),
    ).rejects.toBeInstanceOf(DeliveryPersonIsNotPickedUpThePackageError)
  })

  it('should not be able to mark an package as delivered if the photo delivered package does not exists', async () => {
    const deliveryPerson = makeDeliveryPerson()

    const pckg = makePackage({
      deliveredBy: deliveryPerson.id,
    })

    await inMemoryPackageRepository.create(pckg)

    const photoDeliveredPackageId = randomUUID()

    await expect(() =>
      sut.execute({
        packageId: pckg.id.toString(),
        deliveryPersonId: deliveryPerson.id.toString(),
        photoDeliveredPackageId,
      }),
    ).rejects.toBeInstanceOf(PhotoDeliveredPackageDoesNotExistsError)
  })
})
