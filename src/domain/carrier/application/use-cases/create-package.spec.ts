import { InMemoryPackageRepository } from 'test/repositories/in-memory-package-repository'
import { CreatePackageUseCase } from './create-package'
import { InMemoryRecipientRepository } from 'test/repositories/in-memory-recipient-repository'
import { randomUUID } from 'node:crypto'
import { RecipientDoesNotExistsError } from './errors/recipient-does-not-exists-error'
import { makeRecipient } from 'test/factories/make-recipient'

let inMemoryPackageRepository: InMemoryPackageRepository
let inMemoryRecipientRepository: InMemoryRecipientRepository

let sut: CreatePackageUseCase

describe('Create Package', () => {
  beforeEach(() => {
    inMemoryPackageRepository = new InMemoryPackageRepository()
    inMemoryRecipientRepository = new InMemoryRecipientRepository()

    sut = new CreatePackageUseCase(
      inMemoryPackageRepository,
      inMemoryRecipientRepository,
    )
  })

  it('should be able to create a new package', async () => {
    const recipient = makeRecipient()

    await inMemoryRecipientRepository.create(recipient)

    await sut.execute({
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

  it('should be not able to create a new package if recipient does not exists', async () => {
    const recipientId = randomUUID()

    await expect(() =>
      sut.execute({
        heightInCentimeters: 1,
        weightInGrams: 2,
        recipientId,
        widthInCentimeters: 4,
      }),
    ).rejects.toBeInstanceOf(RecipientDoesNotExistsError)
  })
})
