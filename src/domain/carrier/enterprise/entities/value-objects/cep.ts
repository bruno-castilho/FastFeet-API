export class CEP {
  public value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(value: string) {
    if (!CEP.isValid(value)) {
      throw new Error('CEP inválido')
    }
    return new CEP(value)
  }

  private static isValid(cep: string): boolean {
    const regex = /^\d{5}-?\d{3}$/
    return regex.test(cep)
  }
}
