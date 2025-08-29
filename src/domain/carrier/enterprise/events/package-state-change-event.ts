import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Package, State } from '../entities/package'
import { DomainEvent } from '@/core/events/domain-event'

export class PackageStateChangeEvent implements DomainEvent {
  public ocurredAt: Date
  public package: Package
  public state: State

  constructor(pckg: Package, state: State) {
    this.package = pckg
    this.state = state
    this.ocurredAt = new Date()
  }

  getAggregateId(): UniqueEntityID {
    return this.package.id
  }
}
