// create a module to export the database connection
import { Module } from '@nestjs/common'
import { PrismaDeliveryPersonRepository } from './prisma/repositories/prisma-delivery-person-repository'
import { PrismaService } from './prisma/prisma.service'

@Module({
  providers: [PrismaService, PrismaDeliveryPersonRepository],
  exports: [PrismaService, PrismaDeliveryPersonRepository],
})
export class DatabaseModule {}
