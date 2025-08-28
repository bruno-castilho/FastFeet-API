import { Entity } from '@/core/entities/entity'
import { Email } from './value-objects/email'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { CEP } from './value-objects/cep'
import { Phone } from './value-objects/phone'

export interface RecipientProps {
  name: string
  last_name: string
  email: Email
  phone: Phone
  cep: CEP
  street_address: string
  number: number
  complement?: string | null
  neighborhood: string
  city: string
  state: string
  country: string
}

export class Recipient extends Entity<RecipientProps> {
  static create(props: RecipientProps, id?: UniqueEntityID) {
    const recipient = new Recipient(props, id)

    return recipient
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

  get email() {
    return this.props.email
  }

  set email(email: Email) {
    this.props.email = email
  }

  get phone() {
    return this.props.phone
  }

  set phone(phone: Phone) {
    this.props.phone = phone
  }

  get cep() {
    return this.props.cep
  }

  set cep(cep: CEP) {
    this.props.cep = cep
  }

  get street_address() {
    return this.props.street_address
  }

  set street_address(street_address: string) {
    this.props.street_address = street_address
  }

  get number() {
    return this.props.number
  }

  set number(number: number) {
    this.props.number = number
  }

  get complement() {
    return this.props.complement || null
  }

  set complement(complement: string | null) {
    this.props.complement = complement
  }

  get neighborhood() {
    return this.props.neighborhood
  }

  set neighborhood(neighborhood: string) {
    this.props.neighborhood = neighborhood
  }

  get city() {
    return this.props.city
  }

  set city(city: string) {
    this.props.city = city
  }

  get state() {
    return this.props.state
  }

  set state(state: string) {
    this.props.state = state
  }

  get country() {
    return this.props.country
  }

  set country(country: string) {
    this.props.country = country
  }
}
