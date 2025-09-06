import { MarkPackageAsPendingUseCase } from '@/domain/carrier/application/use-cases/mark-package-as-pending'
import { PrismaPackageRepository } from '@/infra/database/prisma/repositories/prisma-package-repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class MarkPackageAsPending extends MarkPackageAsPendingUseCase {
  constructor(packageRepository: PrismaPackageRepository) {
    super(packageRepository)
  }
}
