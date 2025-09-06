import { MarkPackageAsPickedUpUseCase } from '@/domain/carrier/application/use-cases/mark-package-as-picked-up'
import { PrismaDeliveryPersonRepository } from '@/infra/database/prisma/repositories/prisma-delivery-person-repository'
import { PrismaPackageRepository } from '@/infra/database/prisma/repositories/prisma-package-repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class MarkPackageAsPickedUp extends MarkPackageAsPickedUpUseCase {
  constructor(
    packageRepository: PrismaPackageRepository,
    deliveryPersonRepository: PrismaDeliveryPersonRepository,
  ) {
    super(packageRepository, deliveryPersonRepository)
  }
}
