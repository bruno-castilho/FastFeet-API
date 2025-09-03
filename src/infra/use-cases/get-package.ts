import { GetPackageUseCase } from '@/domain/carrier/application/use-cases/get-package'
import { Injectable } from '@nestjs/common'
import { PrismaPackageRepository } from '../database/prisma/repositories/prisma-package-repository'

@Injectable()
export class GetPackage extends GetPackageUseCase {
  constructor(packageRepository: PrismaPackageRepository) {
    super(packageRepository)
  }
}
