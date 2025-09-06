import { RemovePackageUseCase } from '@/domain/carrier/application/use-cases/remove-package'
import { PrismaPackageRepository } from '@/infra/database/prisma/repositories/prisma-package-repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class RemovePackage extends RemovePackageUseCase {
  constructor(packageRepository: PrismaPackageRepository) {
    super(packageRepository)
  }
}
