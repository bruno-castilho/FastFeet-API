import { SessionRepository } from '@/domain/users/application/repositories/session-repository'
import { Session } from '@/domain/users/enterprise/entities/session'

export class InMemorySessionRepository implements SessionRepository {
  public items: Session[] = []

  async create(session: Session) {
    this.items.push(session)
  }
}
