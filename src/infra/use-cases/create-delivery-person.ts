import { CreateDeliveryPersonUseCase } from '@/domain/carrier/application/use-cases/create-delivery-person'
import { Injectable } from '@nestjs/common'
import { PrismaDeliveryPersonRepository } from '../database/prisma/repositories/prisma-delivery-person-repository'
import { BcryptHasher } from '../cryptography/bcrypt-hasher'

@Injectable()
export class CreateDeliveryPerson extends CreateDeliveryPersonUseCase {
  constructor(
    deliveryPersonRepository: PrismaDeliveryPersonRepository,
    hashGenerator: BcryptHasher,
  ) {
    super(deliveryPersonRepository, hashGenerator)
  }
}
