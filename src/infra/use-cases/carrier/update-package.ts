import { UpdatePackageUseCase } from '@/domain/carrier/application/use-cases/update-package'
import { PrismaPackageRepository } from '@/infra/database/prisma/repositories/prisma-package-repository'
import { PrismaRecipientRepository } from '@/infra/database/prisma/repositories/prisma-recipient-repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UpdatePackage extends UpdatePackageUseCase {
  constructor(
    packageRepository: PrismaPackageRepository,
    recipientRepository: PrismaRecipientRepository,
  ) {
    super(packageRepository, recipientRepository)
  }
}
