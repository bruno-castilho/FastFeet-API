import { isValidPhone } from '@/core/utils/isValidPhone'
import { InvalidPhone } from './errors/invalid-phone-error'

export class Phone {
  public value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(value: string) {
    if (!isValidPhone(value)) {
      throw new InvalidPhone()
    }
    return new Phone(value)
  }
}
