// create a module to export the database connection
import { Module } from '@nestjs/common'
import { PrismaDeliveryPersonRepository } from './prisma/repositories/prisma-delivery-person-repository'
import { PrismaService } from './prisma/prisma.service'
import { PrismaRecipientRepository } from './prisma/repositories/prisma-recipient-repository'
import { PrismaPackageRepository } from './prisma/repositories/prisma-package-repository'

@Module({
  providers: [
    PrismaService,
    PrismaDeliveryPersonRepository,
    PrismaRecipientRepository,
    PrismaPackageRepository,
  ],
  exports: [
    PrismaService,
    PrismaDeliveryPersonRepository,
    PrismaRecipientRepository,
    PrismaPackageRepository,
  ],
})
export class DatabaseModule {}
