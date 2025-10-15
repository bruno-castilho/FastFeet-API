import { Phone } from './phone'
import { InvalidPhone } from './errors/invalid-phone-error'

describe('Phone Value Objetc', () => {
  it('should be able create a phone object', async () => {
    const phone = Phone.create('(00) 00000-0000')

    expect(phone.value).toEqual('(00) 00000-0000')
  })

  it('should not be able create a phone object with invalid phone', () => {
    expect(() => Phone.create('(00) 00000-000')).toThrow(InvalidPhone)
  })
})
