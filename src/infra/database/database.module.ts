// create a module to export the database connection
import { Module } from '@nestjs/common'
import { PrismaDeliveryPersonRepository } from './prisma/repositories/prisma-delivery-person-repository'
import { PrismaService } from './prisma/prisma.service'
import { PrismaRecipientRepository } from './prisma/repositories/prisma-recipient-repository'
import { PrismaPackageRepository } from './prisma/repositories/prisma-package-repository'
import { PrismaPhotoDeliveredPackageRepository } from './prisma/repositories/prisma-photo-delivered-package-repository'

@Module({
  providers: [
    PrismaService,
    PrismaDeliveryPersonRepository,
    PrismaRecipientRepository,
    PrismaPackageRepository,
    PrismaPhotoDeliveredPackageRepository,
  ],
  exports: [
    PrismaService,
    PrismaDeliveryPersonRepository,
    PrismaRecipientRepository,
    PrismaPackageRepository,
    PrismaPhotoDeliveredPackageRepository,
  ],
})
export class DatabaseModule {}
