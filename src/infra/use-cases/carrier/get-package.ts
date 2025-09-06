import { GetPackageUseCase } from '@/domain/carrier/application/use-cases/get-package'
import { PrismaPackageRepository } from '@/infra/database/prisma/repositories/prisma-package-repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class GetPackage extends GetPackageUseCase {
  constructor(packageRepository: PrismaPackageRepository) {
    super(packageRepository)
  }
}
