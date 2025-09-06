import { Injectable } from '@nestjs/common'
import { FetchNearbyPackageUseCase } from '@/domain/carrier/application/use-cases/fetch-nearby-package'
import { PrismaPackageRepository } from '@/infra/database/prisma/repositories/prisma-package-repository'

@Injectable()
export class FetchNearbyPackage extends FetchNearbyPackageUseCase {
  constructor(packageRepository: PrismaPackageRepository) {
    super(packageRepository)
  }
}
