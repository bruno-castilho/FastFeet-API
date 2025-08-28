import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Entity } from '@/core/entities/entity'
import { CPF } from './value-objects/cpf'
import { Email } from './value-objects/email'

export interface DeliveryPersonProps {
  firstName: string
  lastName: string
  cpf: CPF
  email: Email
  password: string
}

export class DeliveryPerson extends Entity<DeliveryPersonProps> {
  static create(props: DeliveryPersonProps, id?: UniqueEntityID) {
    const deliveryPerson = new DeliveryPerson(props, id)

    return deliveryPerson
  }

  get firstName() {
    return this.props.firstName
  }

  set firstName(firstName: string) {
    this.props.firstName = firstName
  }

  get lastName() {
    return this.props.lastName
  }

  set lastName(lastName: string) {
    this.props.lastName = lastName
  }

  get cpf() {
    return this.props.cpf
  }

  set cpf(cpf: CPF) {
    this.props.cpf = cpf
  }

  get email() {
    return this.props.email
  }

  set email(email: Email) {
    this.props.email = email
  }

  get password() {
    return this.props.password
  }

  set password(password: string) {
    this.props.password = password
  }
}
