import { RemoveSessionUseCase } from './remove-session'
import { InMemorySessionRepository } from 'test/repositories/in-memory-session-repository'
import { makeSession } from 'test/factories/make-session'
import { SessionDoesNotExistsError } from './errors/session-does-not-exists-error'

let inMemorySessionRepository: InMemorySessionRepository

let sut: RemoveSessionUseCase

describe('Remove Session', () => {
  beforeEach(() => {
    inMemorySessionRepository = new InMemorySessionRepository()

    sut = new RemoveSessionUseCase(inMemorySessionRepository)
  })

  it('should be able to remove a session', async () => {
    const session = makeSession()

    inMemorySessionRepository.items.push(session)

    await sut.execute({
      sessionId: session.id.toString(),
    })

    expect(inMemorySessionRepository.items).toHaveLength(0)
  })

  it('should nob be able to remove a session if session does not exists', async () => {
    await expect(() =>
      sut.execute({
        sessionId: 'sessionId',
      }),
    ).rejects.toBeInstanceOf(SessionDoesNotExistsError)
  })
})
