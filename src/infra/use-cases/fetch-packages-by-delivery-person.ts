import { FetchPackagesByDeliveryPersonUseCase } from '@/domain/carrier/application/use-cases/fetch-packages-by-delivery-person'
import { Injectable } from '@nestjs/common'
import { PrismaPackageRepository } from '../database/prisma/repositories/prisma-package-repository'

@Injectable()
export class FetchPackagesByDeliveryPerson extends FetchPackagesByDeliveryPersonUseCase {
  constructor(packageRepository: PrismaPackageRepository) {
    super(packageRepository)
  }
}
