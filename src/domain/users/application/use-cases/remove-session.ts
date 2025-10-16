import { SessionRepository } from '../repositories/session-repository'
import { SessionDoesNotExistsError } from './errors/session-does-not-exists-error'

interface RemoveSessionUseCaseRequest {
  sessionId: string
}

export class RemoveSessionUseCase {
  constructor(private sessionRepository: SessionRepository) {}

  async execute({ sessionId }: RemoveSessionUseCaseRequest) {
    const session = await this.sessionRepository.findById(sessionId)

    if (!session) throw new SessionDoesNotExistsError(sessionId)

    await this.sessionRepository.delete(session)
  }
}
