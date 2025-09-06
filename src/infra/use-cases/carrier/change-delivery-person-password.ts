import { ChangeDeliveryPersonPasswordUseCase } from '@/domain/carrier/application/use-cases/change-delivery-person-password'
import { BcryptHasher } from '@/infra/cryptography/bcrypt-hasher'
import { PrismaDeliveryPersonRepository } from '@/infra/database/prisma/repositories/prisma-delivery-person-repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ChangeDeliveryPersonPassword extends ChangeDeliveryPersonPasswordUseCase {
  constructor(
    deliveryPersonRepository: PrismaDeliveryPersonRepository,
    hashGenerator: BcryptHasher,
  ) {
    super(deliveryPersonRepository, hashGenerator)
  }
}
