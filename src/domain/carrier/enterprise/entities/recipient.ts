import { Entity } from '@/core/entities/entity'
import { Email } from '../../../../core/entities/value-objects/email'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { CEP } from '../../../../core/entities/value-objects/cep'
import { Phone } from '../../../../core/entities/value-objects/phone'

export interface RecipientProps {
  firstName: string
  lastName: string
  email: Email
  phone: Phone
  cep: CEP
  streetAddress: string
  number: number
  complement?: string | null
  neighborhood: string
  city: string
  state: string
  country: string
  latitude: number
  longitude: number
}

export class Recipient extends Entity<RecipientProps> {
  static create(props: RecipientProps, id?: UniqueEntityID) {
    const recipient = new Recipient(props, id)

    return recipient
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

  get streetAddress() {
    return this.props.streetAddress
  }

  set streetAddress(streetAddress: string) {
    this.props.streetAddress = streetAddress
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

  get latitude() {
    return this.props.latitude
  }

  set latitude(latitude: number) {
    this.props.latitude = latitude
  }

  get longitude() {
    return this.props.longitude
  }

  set longitude(longitude: number) {
    this.props.longitude = longitude
  }
}
