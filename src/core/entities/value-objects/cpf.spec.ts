import { CPF } from './cpf'
import { InvalidCPF } from './errors/invalid-cpf-error'

describe('CPF Value Objetc', () => {
  it('should be able to create a cpf object', async () => {
    const cpf = CPF.create('390.533.447-05')

    expect(cpf.value).toEqual('39053344705')
  })

  it('should not be able to create a cpf object with invalid format cpf', () => {
    expect(() => CPF.create('390.533.447-0')).toThrow(InvalidCPF)
  })

  it('should not be able to create a cpf object with invalid first digit cpf', () => {
    expect(() => CPF.create('390.533.447-15')).toThrow(InvalidCPF)
  })

  it('should not be able to create a cpf object with invalid second digit cpf', () => {
    expect(() => CPF.create('390.533.447-01')).toThrow(InvalidCPF)
  })
})
