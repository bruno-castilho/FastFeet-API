import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface SessionProps {
  userId: UniqueEntityID
  accessToken: string
  refreshToken: string
  userAgent: string
  ip: string
  createdAt: Date
  updatedAt?: Date | null
}

export class Session extends Entity<SessionProps> {
  static create(props: SessionProps, id?: UniqueEntityID) {
    const session = new Session(props, id)

    return session
  }

  get userId() {
    return this.props.userId
  }

  set userId(userId: UniqueEntityID) {
    this.props.userId = userId
  }

  get accessToken() {
    return this.props.accessToken
  }

  set accessToken(accessToken: string) {
    this.props.accessToken = accessToken
  }

  get refreshToken() {
    return this.props.refreshToken
  }

  set refreshToken(refreshToken: string) {
    this.props.refreshToken = refreshToken
  }

  get userAgent() {
    return this.props.userAgent
  }

  set userAgent(userAgent: string) {
    this.props.userAgent = userAgent
  }

  get ip() {
    return this.props.ip
  }

  set ip(ip: string) {
    this.props.ip = ip
  }

  get createdAt() {
    return this.props.createdAt
  }

  set createdAt(createdAt: Date) {
    this.props.createdAt = createdAt
  }

  get updatedAt() {
    return this.props.updatedAt || null
  }

  set updatedAt(updatedAt: Date | null) {
    this.props.updatedAt = updatedAt
  }
}
