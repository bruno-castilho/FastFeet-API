import {
  SendNotificationUseCase,
  SendNotificationUseCaseRequest,
} from '@/domain/notification/application/use-cases/send-notification'
import { MockInstance } from 'vitest'
import { OnPackageStateChange } from './on-package-state-change'
import { InMemoryRecipientRepository } from 'test/repositories/in-memory-recipient-repository'
import { FakeSendMessage } from 'test/messaging/fake-send-message'
import { makePackage } from 'test/factories/make-package'
import { InMemoryPackageRepository } from 'test/repositories/in-memory-package-repository'
import { makeRecipient } from 'test/factories/make-recipient'

let inMemoryPackageRepository: InMemoryPackageRepository
let inMemoryRecipientRepository: InMemoryRecipientRepository
let fakeSendMessage: FakeSendMessage
let sendNotificationUseCase: SendNotificationUseCase

let sendNotificationExecuteSpy: MockInstance<
  ({ ...args }: SendNotificationUseCaseRequest) => Promise<void>
>

describe('On Package State Change', () => {
  beforeEach(() => {
    inMemoryPackageRepository = new InMemoryPackageRepository()

    inMemoryRecipientRepository = new InMemoryRecipientRepository()
    fakeSendMessage = new FakeSendMessage()
    sendNotificationUseCase = new SendNotificationUseCase(fakeSendMessage)

    sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, 'execute')

    new OnPackageStateChange(
      sendNotificationUseCase,
      inMemoryRecipientRepository,
    )
  })

  it('should  send a notification when an package state change', async () => {
    const recipient = makeRecipient()

    await inMemoryRecipientRepository.create(recipient)

    const pckg = makePackage({
      recipientId: recipient.id,
    })

    await inMemoryPackageRepository.create(pckg)

    pckg.state = 'PENDING'

    await inMemoryPackageRepository.save(pckg)

    expect(sendNotificationExecuteSpy).toHaveBeenCalled()
  })
})
