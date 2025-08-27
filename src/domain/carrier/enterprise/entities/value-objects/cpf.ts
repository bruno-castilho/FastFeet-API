export class CPF {
  public value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(value: string) {
    if (!CPF.isValid(value)) {
      throw new Error('CPF inválido')
    }
    return new CPF(value)
  }

  private static isValid(cpf: string): boolean {
    cpf = cpf.replace(/[.-]/g, '')

    return (
      CPF.isFormatValid(cpf) &&
      CPF.isFirstDigitValid(cpf) &&
      CPF.isSecondDigitValid(cpf)
    )
  }

  private static isFormatValid(cpf: string): boolean {
    return !!cpf && cpf.length === 11 && !/^([0-9])\1+$/.test(cpf)
  }

  private static isFirstDigitValid(cpf: string): boolean {
    let sum = 0

    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (11 - i)
    }
    let rest = (sum * 10) % 11

    if (rest === 10 || rest === 11) rest = 0

    return rest === parseInt(cpf.substring(9, 10))
  }

  private static isSecondDigitValid(cpf: string): boolean {
    let sum = 0

    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (12 - i)
    }

    let rest = (sum * 10) % 11

    if (rest === 10 || rest === 11) rest = 0

    return rest === parseInt(cpf.substring(10, 11))
  }
}
