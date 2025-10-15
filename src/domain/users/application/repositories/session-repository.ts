import { Session } from '../../enterprise/entities/session'

export interface SessionRepository {
  create(session: Session): Promise<void>
}
