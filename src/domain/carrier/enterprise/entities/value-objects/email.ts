import { InvalidEmail } from './errors/invalid-email-error'

export class Email {
  public value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(value: string) {
    if (!Email.isValid(value)) {
      throw new InvalidEmail()
    }
    return new Email(value)
  }

  private static isValid(email: string): boolean {
    const regex = /^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/
    return regex.test(email)
  }
}
