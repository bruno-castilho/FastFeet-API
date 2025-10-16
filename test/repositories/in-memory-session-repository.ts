import { SessionRepository } from '@/domain/users/application/repositories/session-repository'
import { Session } from '@/domain/users/enterprise/entities/session'

export class InMemorySessionRepository implements SessionRepository {
  public items: Session[] = []

  async findById(id: string) {
    const session = this.items.find((item) => item.id.toValue() === id)

    if (!session) {
      return null
    }

    return session
  }

  async create(session: Session) {
    this.items.push(session)
  }

  async save(session: Session) {
    const itemIndex = this.items.findIndex((item) => item.id === session.id)

    this.items[itemIndex] = session
  }
}
