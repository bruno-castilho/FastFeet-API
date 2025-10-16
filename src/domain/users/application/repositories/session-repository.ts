import { Session } from '../../enterprise/entities/session'

export interface SessionRepository {
  findById(id: string): Promise<Session | null>
  create(session: Session): Promise<void>
  save(session: Session): Promise<void>
  delete(session: Session): Promise<void>
}
