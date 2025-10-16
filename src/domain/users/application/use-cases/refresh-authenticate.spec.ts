import { FakeEncrypter } from 'test/cryptography/fake-encrypter'
import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { makeUser } from 'test/factories/make-user'
import { InMemorySessionRepository } from 'test/repositories/in-memory-session-repository'
import { RefreshAuthenticateUseCase } from './refresh-authenticate'
import { makeSession } from 'test/factories/make-session'

let inMemoryUserRepository: InMemoryUserRepository
let inMemorySessionRepository: InMemorySessionRepository
let encrypter: FakeEncrypter

let sut: RefreshAuthenticateUseCase

describe('Refresh Authenticate', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemorySessionRepository = new InMemorySessionRepository()
    encrypter = new FakeEncrypter()

    sut = new RefreshAuthenticateUseCase(
      inMemoryUserRepository,
      inMemorySessionRepository,
      encrypter,
      encrypter,
    )
  })

  it('should be able to authenticate an user', async () => {
    const user = makeUser()

    inMemoryUserRepository.items.push(user)

    const session = makeSession({
      userId: user.id,
    })

    inMemorySessionRepository.items.push(session)

    const { accessToken, refreshToken } = await sut.execute({
      userId: user.id.toValue(),
      sessionId: session.id.toValue(),
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
})
