import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

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
}

export class Package extends Entity<PackageProps> {
  static create(props: PackageProps, id?: UniqueEntityID) {
    return new Package(props, id)
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
}
