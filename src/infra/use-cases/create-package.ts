import { CreatePackageUseCase } from '@/domain/carrier/application/use-cases/create-package'
import { Injectable } from '@nestjs/common'
import { PrismaRecipientRepository } from '../database/prisma/repositories/prisma-recipient-repository'
import { PrismaPackageRepository } from '../database/prisma/repositories/prisma-package-repository'

@Injectable()
export class CreatePackage extends CreatePackageUseCase {
  constructor(
    packageRepository: PrismaPackageRepository,
    recipientRepository: PrismaRecipientRepository,
  ) {
    super(packageRepository, recipientRepository)
  }
}
