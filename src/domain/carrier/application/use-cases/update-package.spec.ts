import { InMemoryPackageRepository } from 'test/repositories/in-memory-package-repository'
import { InMemoryRecipientRepository } from 'test/repositories/in-memory-recipient-repository'
import { makeRecipient } from 'test/factories/make-recipient'
import { UpdatePackageUseCase } from './update-package'
import { makePackage } from 'test/factories/make-package'
import { randomUUID } from 'crypto'
import { RecipientDoesNotExistsError } from './errors/recipient-does-not-exists-error'
import { PackageDoesNotExistsError } from './errors/package-does-not-exists-error'

let inMemoryPackageRepository: InMemoryPackageRepository
let inMemoryRecipientRepository: InMemoryRecipientRepository

let sut: UpdatePackageUseCase

describe('Update Package', () => {
  beforeEach(() => {
    inMemoryPackageRepository = new InMemoryPackageRepository()
    inMemoryRecipientRepository = new InMemoryRecipientRepository()

    sut = new UpdatePackageUseCase(
      inMemoryPackageRepository,
      inMemoryRecipientRepository,
    )
  })

  it('should be able to update a package', async () => {
    const recipient = makeRecipient()

    await inMemoryRecipientRepository.create(recipient)

    const pckg = makePackage({ recipientId: recipient.id })

    await inMemoryPackageRepository.create(pckg)

    await sut.execute({
      packageId: pckg.id.toValue(),
      heightInCentimeters: 1,
      weightInGrams: 2,
      widthInCentimeters: 3,
      recipientId: recipient.id.toValue(),
    })

    expect(inMemoryPackageRepository.items).toHaveLength(1)
    expect(inMemoryPackageRepository.items[0]).toEqual(
      expect.objectContaining({
        heightInCentimeters: 1,
        weightInGrams: 2,
        widthInCentimeters: 3,
        recipientId: recipient.id,
      }),
    )
  })

  it('should not be able to update a package if the package does not exists', async () => {
    const packageId = randomUUID()
    const recipientId = randomUUID()
    await expect(() =>
      sut.execute({
        packageId,
        heightInCentimeters: 1,
        weightInGrams: 2,
        recipientId,
        widthInCentimeters: 4,
      }),
    ).rejects.toBeInstanceOf(PackageDoesNotExistsError)
  })

  it('should not be able to update a package if the recipient does not exists', async () => {
    const recipient = makeRecipient()

    await inMemoryRecipientRepository.create(recipient)

    const pckg = makePackage({ recipientId: recipient.id })

    await inMemoryPackageRepository.create(pckg)

    const recipientId = randomUUID()
    await expect(() =>
      sut.execute({
        packageId: pckg.id.toValue(),
        heightInCentimeters: 1,
        weightInGrams: 2,
        recipientId,
        widthInCentimeters: 4,
      }),
    ).rejects.toBeInstanceOf(RecipientDoesNotExistsError)
  })
})
