import { DomainEvents } from '@/core/events/domain-events'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { PackageFactory } from 'test/factories/make-package'
import { RecipientFactory } from 'test/factories/make-recipient'
import { MockInstance } from 'vitest'
import { MailService } from '../notification/mail/mail.service'
import { waitFor } from 'test/utils/wait-for'

let mailService: MailService

let sendMailExecuteSpy: MockInstance<
  (email: string, title: string, content: string) => Promise<void>
>

describe('On package state change (E2E)', () => {
  let app: INestApplication
  let packageFactory: PackageFactory
  let recipientFactory: RecipientFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [PackageFactory, RecipientFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    packageFactory = moduleRef.get(PackageFactory)
    recipientFactory = moduleRef.get(RecipientFactory)
    mailService = moduleRef.get(MailService)
    sendMailExecuteSpy = vi.spyOn(mailService, 'send')

    DomainEvents.shouldRun = true

    await app.init()
  })

  it('should send a notification when package change state', async () => {
    const recipient = await recipientFactory.makePrismaRecipient()

    const pckg = await packageFactory.makePrismaPackage({
      recipientId: recipient.id,
    })

    const response = await request(app.getHttpServer()).patch(
      `/package/${pckg.id.toValue()}/pending`,
    )

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        message: "Estado da encomenda alterado para 'Aguardando'",
      }),
    )

    await waitFor(async () => {
      expect(sendMailExecuteSpy).toHaveBeenCalled()
    })
  })
})
