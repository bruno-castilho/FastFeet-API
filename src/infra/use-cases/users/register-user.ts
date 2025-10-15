import { RegisterUserUseCase } from '@/domain/users/application/use-cases/register-user'
import { BcryptHasher } from '@/infra/cryptography/bcrypt-hasher'
import { PrismaUserRepository } from '@/infra/database/prisma/repositories/prisma-user-repository'

import { Injectable } from '@nestjs/common'

@Injectable()
export class RegisterUser extends RegisterUserUseCase {
  constructor(
    userRepository: PrismaUserRepository,
    hashGenerator: BcryptHasher,
  ) {
    super(userRepository, hashGenerator)
  }
}
