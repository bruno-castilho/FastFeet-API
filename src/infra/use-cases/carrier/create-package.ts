import { CreatePackageUseCase } from '@/domain/carrier/application/use-cases/create-package'
import { PrismaPackageRepository } from '@/infra/database/prisma/repositories/prisma-package-repository'
import { PrismaRecipientRepository } from '@/infra/database/prisma/repositories/prisma-recipient-repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class CreatePackage extends CreatePackageUseCase {
  constructor(
    packageRepository: PrismaPackageRepository,
    recipientRepository: PrismaRecipientRepository,
  ) {
    super(packageRepository, recipientRepository)
  }
}
