import { InMemoryPackageRepository } from 'test/repositories/in-memory-package-repository'
import { makePackage } from 'test/factories/make-package'
import { randomUUID } from 'crypto'
import { PackageDoesNotExistsError } from './errors/package-does-not-exists-error'
import { MarkPackageAsPendingUseCase } from './mark-package-as-pending'
import { State } from '../../enterprise/entities/package'

let inMemoryPackageRepository: InMemoryPackageRepository

let sut: MarkPackageAsPendingUseCase

describe('Mark Package as Pending', () => {
  beforeEach(() => {
    inMemoryPackageRepository = new InMemoryPackageRepository()

    sut = new MarkPackageAsPendingUseCase(inMemoryPackageRepository)
  })

  it('should be able to mark an package as pending', async () => {
    const pckg = makePackage()

    await inMemoryPackageRepository.create(pckg)

    await sut.execute({
      packageId: pckg.id.toValue(),
    })

    expect(inMemoryPackageRepository.items[0]).toEqual(
      expect.objectContaining({
        state: State.PENDING,
      }),
    )
  })

  it('should not be able to mark an package as pending if the package does not exists', async () => {
    const packageId = randomUUID()

    await expect(() =>
      sut.execute({
        packageId,
      }),
    ).rejects.toBeInstanceOf(PackageDoesNotExistsError)
  })
})
