import { InMemoryPackageRepository } from 'test/repositories/in-memory-package-repository'
import { GetPackageUseCase } from './get-package'
import { PackageDoesNotExistsError } from './errors/package-does-not-exists-error'
import { makePackage } from 'test/factories/make-package'

let inMemoryPackageRepository: InMemoryPackageRepository

let sut: GetPackageUseCase

describe('Get Package', () => {
  beforeEach(() => {
    inMemoryPackageRepository = new InMemoryPackageRepository()

    sut = new GetPackageUseCase(inMemoryPackageRepository)
  })

  it('should be able to get a package', async () => {
    const pckg = makePackage()

    await inMemoryPackageRepository.create(pckg)

    const result = await sut.execute({ packageId: pckg.id.toValue() })

    expect(result.pckg).toEqual(pckg)
  })

  it('should not be able to get a package if the package does not exists', async () => {
    await expect(() =>
      sut.execute({
        packageId: '1',
      }),
    ).rejects.toBeInstanceOf(PackageDoesNotExistsError)
  })
})
