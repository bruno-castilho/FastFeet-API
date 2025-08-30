import { InvalidPhone } from './errors/invalid-phone-error'

export class Phone {
  public value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(value: string) {
    if (!Phone.isValid(value)) {
      throw new InvalidPhone()
    }
    return new Phone(value)
  }

  private static isValid(phone: string): boolean {
    const regex = /^(\(?\d{2}\)?\s?)?(\d{4,5}-?\d{4})$/
    return regex.test(phone)
  }
}
