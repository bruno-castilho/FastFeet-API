import { Injectable } from '@nestjs/common'
import { AuthenticateDeliveryPersonUseCase } from '@/domain/carrier/application/use-cases/authenticate-delivery-person'
import { PrismaDeliveryPersonRepository } from '../database/prisma/repositories/prisma-delivery-person-repository'
import { BcryptHasher } from '../cryptography/bcrypt-hasher'
import { JwtEncrypter } from '../cryptography/jwt-encrypter'

@Injectable()
export class AuthenticateDeliveryPerson extends AuthenticateDeliveryPersonUseCase {
  constructor(
    deliveryPersonRepository: PrismaDeliveryPersonRepository,
    hashGenerator: BcryptHasher,
    jwtEncrypter: JwtEncrypter,
  ) {
    super(deliveryPersonRepository, hashGenerator, jwtEncrypter)
  }
}
