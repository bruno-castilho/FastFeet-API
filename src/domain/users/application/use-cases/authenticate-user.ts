import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Session } from '../../enterprise/entities/session'
import { Encrypter } from '../cryptography/encrypter'
import { HashComparer } from '../cryptography/hash-comparer'
import { SessionRepository } from '../repositories/session-repository'
import { UserRepository } from '../repositories/user-repository'
import { WrongCredentialsError } from './errors/wrong-credentials-error'

interface AuthenticateUserUseCaseRequest {
  cpf: string
  password: string
  userAgent: string
  ip: string
}

export class AuthenticateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private sessionRepository: SessionRepository,
    private hashComparer: HashComparer,
    private accessTokenEncrypter: Encrypter,
    private refreshTokenEncrypter: Encrypter,
  ) {}

  async execute({
    cpf,
    password,
    userAgent,
    ip,
  }: AuthenticateUserUseCaseRequest) {
    const user = await this.userRepository.findByCPF(cpf)

    if (!user) throw new WrongCredentialsError()

    const isPasswordValid = await this.hashComparer.compare(
      password,
      user.password,
    )

    if (!isPasswordValid) throw new WrongCredentialsError()

    const sessionId = new UniqueEntityID()

    const accessToken = await this.accessTokenEncrypter.encrypt({
      sub: user.id.toString(),
      role: user.role.value,
      sessionId: sessionId.toString(),
    })

    const refreshToken = await this.refreshTokenEncrypter.encrypt({
      sub: user.id.toString(),
      role: user.role.value,
      sessionId: sessionId.toString(),
    })

    const session = Session.create(
      {
        accessToken,
        refreshToken,
        ip,
        userAgent,
        userId: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      sessionId,
    )

    await this.sessionRepository.create(session)

    return {
      accessToken,
      refreshToken,
    }
  }
}
