import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Entity } from '@/core/entities/entity'
import { CPF } from './value-objects/cpf'
import { Email } from './value-objects/email'

export interface DeliveryPersonProps {
  name: string
  last_name: string
  cpf: CPF
  email: Email
  password: string
}

export class DeliveryPerson extends Entity<DeliveryPersonProps> {
  static create(props: DeliveryPersonProps, id?: UniqueEntityID) {
    const deliveryPerson = new DeliveryPerson(props, id)

    return deliveryPerson
  }

  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get last_name() {
    return this.props.last_name
  }

  set last_name(last_name: string) {
    this.props.last_name = last_name
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
