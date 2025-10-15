import { isValidCEP } from '@/core/utils/isValidCEP'
import { InvalidCEP } from './errors/invalid-cep-error'

export class CEP {
  public value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(value: string) {
    if (!isValidCEP(value)) {
      throw new InvalidCEP()
    }
    return new CEP(value)
  }
}
