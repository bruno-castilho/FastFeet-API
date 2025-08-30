import { AggregateRoot } from '@/core/entities/aggregate-root'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { PackageStateChangeEvent } from '../events/package-state-change-event'

export enum State {
  CREATED,
  PENDING,
  PICKEDUP,
  DELIVERED,
  RETURNED,
}

export interface PackageProps {
  heightInCentimeters: number
  widthInCentimeters: number
  weightInGrams: number
  state: State
  recipientId: UniqueEntityID
  deliveredBy?: UniqueEntityID | null
  createdAt?: Date
  postedAt?: Date | null
  pickedUpAt?: Date | null
  deliveredAt?: Date | null
  returnedAt?: Date | null
}

export class Package extends AggregateRoot<PackageProps> {
  static create(props: PackageProps, id?: UniqueEntityID) {
    const pckg = new Package(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
    return pckg
  }

  get heightInCentimeters() {
    return this.props.heightInCentimeters
  }

  set heightInCentimeters(heightInCentimeters: number) {
    this.props.heightInCentimeters = heightInCentimeters
  }

  get widthInCentimeters() {
    return this.props.widthInCentimeters
  }

  set widthInCentimeters(widthInCentimeters: number) {
    this.props.widthInCentimeters = widthInCentimeters
  }

  get weightInGrams() {
    return this.props.weightInGrams
  }

  set weightInGrams(weightInGrams: number) {
    this.props.weightInGrams = weightInGrams
  }

  get state() {
    return this.props.state
  }

  set state(state: State) {
    this.props.state = state

    this.addDomainEvent(new PackageStateChangeEvent(this, state))
  }

  get recipientId() {
    return this.props.recipientId
  }

  set recipientId(recipientId: UniqueEntityID) {
    this.props.recipientId = recipientId
  }

  get deliveredBy() {
    return this.props.deliveredBy || null
  }

  set deliveredBy(deliveredBy: UniqueEntityID | null) {
    this.props.deliveredBy = deliveredBy
  }

  get createdAt() {
    return this.props.createdAt
  }

  get postedAt() {
    return this.props.postedAt || null
  }

  set postedAt(postedAt: Date | null) {
    this.props.postedAt = postedAt
  }

  get pickedUpAt() {
    return this.props.pickedUpAt || null
  }

  set pickedUpAt(pickedUpAt: Date | null) {
    this.props.pickedUpAt = pickedUpAt
  }

  get deliveredAt() {
    return this.props.deliveredAt || null
  }

  set deliveredAt(deliveredAt: Date | null) {
    this.props.deliveredAt = deliveredAt
  }

  get returnedAt() {
    return this.props.returnedAt || null
  }

  set returnedAt(returnedAt: Date | null) {
    this.props.returnedAt = returnedAt
  }
}
