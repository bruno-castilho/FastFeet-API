import { RemovePackageUseCase } from '@/domain/carrier/application/use-cases/remove-package'
import { Injectable } from '@nestjs/common'
import { PrismaPackageRepository } from '../database/prisma/repositories/prisma-package-repository'

@Injectable()
export class RemovePackage extends RemovePackageUseCase {
  constructor(packageRepository: PrismaPackageRepository) {
    super(packageRepository)
  }
}
