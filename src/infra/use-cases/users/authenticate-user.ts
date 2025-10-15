import { AuthenticateUserUseCase } from '@/domain/users/application/use-cases/authenticate-user'
import { BcryptHasher } from '@/infra/cryptography/bcrypt-hasher'
import { AccessTokenEncrypter } from '@/infra/cryptography/access-token-encrypter'
import { PrismaSessionRepository } from '@/infra/database/prisma/repositories/prisma-session-repository'
import { PrismaUserRepository } from '@/infra/database/prisma/repositories/prisma-user-repository'

import { Injectable } from '@nestjs/common'
import { RefreshTokenEncrypter } from '@/infra/cryptography/refresh-token-encrypter'

@Injectable()
export class AuthenticateUser extends AuthenticateUserUseCase {
  constructor(
    userRepository: PrismaUserRepository,
    sessionRepository: PrismaSessionRepository,
    hashComparer: BcryptHasher,
    accessTokenEncrypter: AccessTokenEncrypter,
    refreshTokenEncrypter: RefreshTokenEncrypter,
  ) {
    super(
      userRepository,
      sessionRepository,
      hashComparer,
      accessTokenEncrypter,
      refreshTokenEncrypter,
    )
  }
}
