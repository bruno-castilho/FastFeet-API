import { CreateDeliveryPersonUseCase } from '@/domain/carrier/application/use-cases/create-delivery-person'
import { BcryptHasher } from '@/infra/cryptography/bcrypt-hasher'
import { PrismaDeliveryPersonRepository } from '@/infra/database/prisma/repositories/prisma-delivery-person-repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class CreateDeliveryPerson extends CreateDeliveryPersonUseCase {
  constructor(
    deliveryPersonRepository: PrismaDeliveryPersonRepository,
    hashGenerator: BcryptHasher,
  ) {
    super(deliveryPersonRepository, hashGenerator)
  }
}
