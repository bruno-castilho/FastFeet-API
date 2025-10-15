// create a module to export the database connection
import { Module } from '@nestjs/common'
import { PrismaDeliveryPersonRepository } from './prisma/repositories/prisma-delivery-person-repository'
import { PrismaService } from './prisma/prisma.service'
import { PrismaRecipientRepository } from './prisma/repositories/prisma-recipient-repository'
import { PrismaPackageRepository } from './prisma/repositories/prisma-package-repository'
import { PrismaPhotoDeliveredPackageRepository } from './prisma/repositories/prisma-photo-delivered-package-repository'
import { PrismaAdminRepository } from './prisma/repositories/prisma-admin-repository'
import { PrismaUserRepository } from './prisma/repositories/prisma-user-repository'
import { PrismaSessionRepository } from './prisma/repositories/prisma-session-repository'

@Module({
  providers: [
    PrismaService,
    PrismaDeliveryPersonRepository,
    PrismaRecipientRepository,
    PrismaPackageRepository,
    PrismaPhotoDeliveredPackageRepository,
    PrismaAdminRepository,
    PrismaUserRepository,
    PrismaSessionRepository,
  ],
  exports: [
    PrismaService,
    PrismaDeliveryPersonRepository,
    PrismaRecipientRepository,
    PrismaPackageRepository,
    PrismaPhotoDeliveredPackageRepository,
    PrismaAdminRepository,
    PrismaUserRepository,
    PrismaSessionRepository,
  ],
})
export class DatabaseModule {}
