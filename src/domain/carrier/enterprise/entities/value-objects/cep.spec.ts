import { CEP } from './cep'
import { InvalidCEP } from './errors/invalid-cep-error'

describe('CEP Value Objetc', () => {
  it('should be able create a cep object', async () => {
    const cep = CEP.create('00000-000')

    expect(cep.value).toEqual('00000-000')
  })

  it('should not be able create a cep object with invalid cep', () => {
    expect(() => CEP.create('00000-00')).toThrow(InvalidCEP)
  })
})
