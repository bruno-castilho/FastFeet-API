import { FakeEncrypter } from 'test/cryptography/fake-encrypter'
import { FakeHasher } from 'test/cryptography/fake-hasher'

import { WrongCredentialsError } from './errors/wrong-credentials-error'
import { AuthenticateUserUseCase } from './authenticate-user'

import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { makeUser } from 'test/factories/make-user'
import { InMemorySessionRepository } from 'test/repositories/in-memory-session-repository'

let inMemoryUserRepository: InMemoryUserRepository
let inMemorySessionRepository: InMemorySessionRepository
let fakeHasher: FakeHasher
let encrypter: FakeEncrypter

let sut: AuthenticateUserUseCase

describe('Authenticate User', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemorySessionRepository = new InMemorySessionRepository()
    fakeHasher = new FakeHasher()
    encrypter = new FakeEncrypter()

    sut = new AuthenticateUserUseCase(
      inMemoryUserRepository,
      inMemorySessionRepository,
      fakeHasher,
      encrypter,
      encrypter,
    )
  })

  it('should be able to authenticate an user', async () => {
    const user = makeUser({
      password: await fakeHasher.hash('123456'),
    })

    inMemoryUserRepository.items.push(user)

    const { accessToken, refreshToken } = await sut.execute({
      cpf: user.cpf.value,
      password: '123456',
      ip: '192.0.0.1',
      userAgent: 'userAgent',
    })

    expect(accessToken).toEqual(expect.any(String))
    expect(refreshToken).toEqual(expect.any(String))

    expect(inMemorySessionRepository.items).toHaveLength(1)
    expect(inMemorySessionRepository.items[0]).toEqual(
      expect.objectContaining({
        accessToken,
        refreshToken,
        ip: '192.0.0.1',
        userAgent: 'userAgent',
      }),
    )
  })

  it('should not be able to authenticate an user if cpf does not exists', async () => {
    const user = makeUser({
      password: await fakeHasher.hash('123456'),
    })

    inMemoryUserRepository.items.push(user)

    await expect(() =>
      sut.execute({
        cpf: '000.000.000-55',
        password: '123456',
        ip: '192.0.0.1',
        userAgent: 'userAgent',
      }),
    ).rejects.toBeInstanceOf(WrongCredentialsError)
  })

  it('should not be able to authenticate an user with wrong password', async () => {
    const user = makeUser({
      password: await fakeHasher.hash('123456'),
    })

    inMemoryUserRepository.items.push(user)

    await expect(() =>
      sut.execute({
        cpf: user.cpf.value,
        password: '12345',
        ip: '192.0.0.1',
        userAgent: 'userAgent',
      }),
    ).rejects.toBeInstanceOf(WrongCredentialsError)
  })
})
