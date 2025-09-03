import { MarkPackageAsPickedUpUseCase } from '@/domain/carrier/application/use-cases/mark-package-as-picked-up'
import { PrismaPackageRepository } from '../database/prisma/repositories/prisma-package-repository'
import { Injectable } from '@nestjs/common'
import { PrismaDeliveryPersonRepository } from '../database/prisma/repositories/prisma-delivery-person-repository'

@Injectable()
export class MarkPackageAsPickedUp extends MarkPackageAsPickedUpUseCase {
  constructor(
    packageRepository: PrismaPackageRepository,
    deliveryPersonRepository: PrismaDeliveryPersonRepository,
  ) {
    super(packageRepository, deliveryPersonRepository)
  }
}
