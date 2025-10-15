import { FakeHasher } from 'test/cryptography/fake-hasher'

import { CPFAlreadyExistsError } from './errors/cpf-already-exists-error'
import { EmailAlreadyExistsError } from './errors/email-already-exists-error'
import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { RegisterUserUseCase } from './register-user'
import { makeUser } from 'test/factories/make-user'

let inMemoryUserRepository: InMemoryUserRepository
let fakeHasher: FakeHasher

let sut: RegisterUserUseCase

describe('Register User', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    fakeHasher = new FakeHasher()

    sut = new RegisterUserUseCase(inMemoryUserRepository, fakeHasher)
  })

  it('should be able to register a new user', async () => {
    await sut.execute({
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      role: 'ADMIN',
      password: '123456',
      cpf: '39053344705',
    })

    expect(inMemoryUserRepository.items).toHaveLength(1)
    expect(inMemoryUserRepository.items[0]).toEqual(
      expect.objectContaining({
        firstName: 'John',
        lastName: 'Doe',
      }),
    )
  })

  it('should not be able to register an user with same email', async () => {
    const user = makeUser()

    await inMemoryUserRepository.create(user)

    await expect(() =>
      sut.execute({
        firstName: 'John',
        lastName: 'Doe',
        role: 'ADMIN',
        email: user.email.value,
        password: '123456',
        cpf: '98765432100',
      }),
    ).rejects.toBeInstanceOf(EmailAlreadyExistsError)
  })

  it('should not be able to register an user with same cpf', async () => {
    const user = makeUser()

    await inMemoryUserRepository.create(user)

    await expect(() =>
      sut.execute({
        firstName: 'John',
        lastName: 'Doe',
        role: 'ADMIN',
        email: 'johndoe@example.com',
        password: '123456',
        cpf: user.cpf.value,
      }),
    ).rejects.toBeInstanceOf(CPFAlreadyExistsError)
  })
})
