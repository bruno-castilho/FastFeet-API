import { isValidCPF } from '@/core/utils/isValidCPF'
import { InvalidCPF } from './errors/invalid-cpf-error'

export class CPF {
  public value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(value: string) {
    const cpf = value.replace(/[.-]/g, '')

    if (!isValidCPF(cpf)) {
      throw new InvalidCPF()
    }
    return new CPF(cpf)
  }
}
