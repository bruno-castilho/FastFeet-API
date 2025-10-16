import { Encrypter } from '../cryptography/encrypter'
import { SessionRepository } from '../repositories/session-repository'
import { UserRepository } from '../repositories/user-repository'
import { SessionDoesNotExistsError } from './errors/session-does-not-exists-error'
import { UserDoesNotExistsError } from './errors/user-does-not-exists-error'

interface RefreshAuthenticateUseCaseRequest {
  userId: string
  sessionId: string
  userAgent: string
  ip: string
}

export class RefreshAuthenticateUseCase {
  constructor(
    private userRepository: UserRepository,
    private sessionRepository: SessionRepository,
    private accessTokenEncrypter: Encrypter,
    private refreshTokenEncrypter: Encrypter,
  ) {}

  async execute({
    sessionId,
    userId,
    userAgent,
    ip,
  }: RefreshAuthenticateUseCaseRequest) {
    const user = await this.userRepository.findById(userId)

    if (!user) throw new UserDoesNotExistsError(userId)

    const session = await this.sessionRepository.findById(sessionId)

    if (!session) throw new SessionDoesNotExistsError(sessionId)

    const accessToken = await this.accessTokenEncrypter.encrypt({
      sub: user.id.toString(),
      role: user.role.value,
      sessionId: session.id.toString(),
    })

    const refreshToken = await this.refreshTokenEncrypter.encrypt({
      sub: user.id.toString(),
      role: user.role.value,
      sessionId: session.id.toString(),
    })

    session.ip = ip
    session.userAgent = userAgent
    session.accessToken = accessToken
    session.refreshToken = refreshToken

    session.updatedAt = new Date()

    await this.sessionRepository.save(session)

    return {
      accessToken,
      refreshToken,
    }
  }
}
