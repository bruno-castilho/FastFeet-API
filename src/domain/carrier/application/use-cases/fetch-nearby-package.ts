import { PackageRepository } from '../repositories/package-repository'

interface FetchNearbyPackageUseCaseRequest {
  latitude: number
  longitude: number
  page: number
}

export class FetchNearbyPackageUseCase {
  constructor(private packageRepository: PackageRepository) {}

  async execute({
    latitude,
    longitude,
    page,
  }: FetchNearbyPackageUseCaseRequest) {
    const packages = await this.packageRepository.findManyNearbyPanding(
      latitude,
      longitude,
      { page },
    )

    return { packages }
  }
}
