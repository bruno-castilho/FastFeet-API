import { UpdatePackageUseCase } from '@/domain/carrier/application/use-cases/update-package'
import { Injectable } from '@nestjs/common'
import { PrismaRecipientRepository } from '../database/prisma/repositories/prisma-recipient-repository'
import { PrismaPackageRepository } from '../database/prisma/repositories/prisma-package-repository'

@Injectable()
export class UpdatePackage extends UpdatePackageUseCase {
  constructor(
    packageRepository: PrismaPackageRepository,
    recipientRepository: PrismaRecipientRepository,
  ) {
    super(packageRepository, recipientRepository)
  }
}
