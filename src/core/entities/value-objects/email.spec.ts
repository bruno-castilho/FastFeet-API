import { Email } from './email'
import { InvalidEmail } from './errors/invalid-email-error'

describe('Email Value Objetc', () => {
  it('should be able create a email object', async () => {
    const email = Email.create('johndoe@example.com')

    expect(email.value).toEqual('johndoe@example.com')
  })

  it('should not be able create a email object with invalid email', () => {
    expect(() => Email.create('johndoeexample.c')).toThrow(InvalidEmail)
  })
})
