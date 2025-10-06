import { FakeEncrypter } from 'test/cryptography/fake-encrypter'
import { FakeHasher } from 'test/cryptography/fake-hasher'

import { WrongCredentialsError } from './errors/wrong-credentials-error'
import { AuthenticateAdminUseCase } from './authenticate-admin'
import { InMemoryAdminRepository } from 'test/repositories/in-memory-admin-repository'
import { makeAdmin } from 'test/factories/make-admin'

let inMemoryAdminRepository: InMemoryAdminRepository
let fakeHasher: FakeHasher
let encrypter: FakeEncrypter

let sut: AuthenticateAdminUseCase

describe('Authenticate Admin', () => {
  beforeEach(() => {
    inMemoryAdminRepository = new InMemoryAdminRepository()
    fakeHasher = new FakeHasher()
    encrypter = new FakeEncrypter()

    sut = new AuthenticateAdminUseCase(
      inMemoryAdminRepository,
      fakeHasher,
      encrypter,
    )
  })

  it('should be able to authenticate an admin', async () => {
    const admin = makeAdmin({
      password: await fakeHasher.hash('123456'),
    })

    inMemoryAdminRepository.items.push(admin)

    const { accessToken } = await sut.execute({
      cpf: admin.cpf.value,
      password: '123456',
    })

    expect(accessToken).toEqual(expect.any(String))
  })

  it('should not be able to authenticate an admin if cpf does not exists', async () => {
    const admin = makeAdmin({
      password: await fakeHasher.hash('123456'),
    })

    inMemoryAdminRepository.items.push(admin)

    await expect(() =>
      sut.execute({
        cpf: '000.000.000-55',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(WrongCredentialsError)
  })

  it('should not be able to authenticate an admin with wrong password', async () => {
    const admin = makeAdmin({
      password: await fakeHasher.hash('123456'),
    })

    inMemoryAdminRepository.items.push(admin)

    await expect(() =>
      sut.execute({
        cpf: admin.cpf.value,
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(WrongCredentialsError)
  })
})
