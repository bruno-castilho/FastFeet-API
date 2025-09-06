import { FetchPackagesByDeliveryPersonUseCase } from '@/domain/carrier/application/use-cases/fetch-packages-by-delivery-person'
import { PrismaPackageRepository } from '@/infra/database/prisma/repositories/prisma-package-repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class FetchPackagesByDeliveryPerson extends FetchPackagesByDeliveryPersonUseCase {
  constructor(packageRepository: PrismaPackageRepository) {
    super(packageRepository)
  }
}
