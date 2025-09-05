import { Injectable } from '@nestjs/common'
import { PrismaPackageRepository } from '../database/prisma/repositories/prisma-package-repository'
import { FetchNearbyPackageUseCase } from '@/domain/carrier/application/use-cases/fetch-nearby-package'

@Injectable()
export class FetchNearbyPackage extends FetchNearbyPackageUseCase {
  constructor(packageRepository: PrismaPackageRepository) {
    super(packageRepository)
  }
}
