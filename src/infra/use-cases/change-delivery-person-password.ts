import { ChangeDeliveryPersonPasswordUseCase } from '@/domain/carrier/application/use-cases/change-delivery-person-password'
import { Injectable } from '@nestjs/common'
import { PrismaDeliveryPersonRepository } from '../database/prisma/repositories/prisma-delivery-person-repository'
import { BcryptHasher } from '../cryptography/bcrypt-hasher'

@Injectable()
export class ChangeDeliveryPersonPassword extends ChangeDeliveryPersonPasswordUseCase {
  constructor(
    deliveryPersonRepository: PrismaDeliveryPersonRepository,
    hashGenerator: BcryptHasher,
  ) {
    super(deliveryPersonRepository, hashGenerator)
  }
}
