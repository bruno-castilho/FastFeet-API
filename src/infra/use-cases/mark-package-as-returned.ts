import { MarkPackageAsReturnedUseCase } from '@/domain/carrier/application/use-cases/mark-package-as-returned'
import { PrismaPackageRepository } from '../database/prisma/repositories/prisma-package-repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class MarkPackageAsReturned extends MarkPackageAsReturnedUseCase {
  constructor(packageRepository: PrismaPackageRepository) {
    super(packageRepository)
  }
}
