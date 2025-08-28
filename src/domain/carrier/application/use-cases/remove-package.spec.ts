import { InMemoryPackageRepository } from 'test/repositories/in-memory-package-repository'
import { RemovePackageUseCase } from './remove-package'
import { PackageDoesNotExistsError } from './errors/package-does-not-exists-error'
import { makePackage } from 'test/factories/make-package'

let inMemoryPackageRepository: InMemoryPackageRepository

let sut: RemovePackageUseCase

describe('Remove Package', () => {
  beforeEach(() => {
    inMemoryPackageRepository = new InMemoryPackageRepository()

    sut = new RemovePackageUseCase(inMemoryPackageRepository)
  })

  it('should be able to remove a package', async () => {
    const pckg = makePackage()

    await inMemoryPackageRepository.create(pckg)

    await sut.execute({ packageId: pckg.id.toValue() })

    expect(inMemoryPackageRepository.items).toHaveLength(0)
  })

  it('should not be able to remove a package if the package does not exists', async () => {
    await expect(() =>
      sut.execute({
        packageId: '1',
      }),
    ).rejects.toBeInstanceOf(PackageDoesNotExistsError)
  })
})
