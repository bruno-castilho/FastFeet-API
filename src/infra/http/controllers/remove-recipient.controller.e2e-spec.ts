import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { RecipientFactory } from 'test/factories/make-recipient'

describe('Remove Recipient (E2E)', () => {
  let app: INestApplication
  let recipientFactory: RecipientFactory
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [RecipientFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    recipientFactory = moduleRef.get(RecipientFactory)
    prisma = moduleRef.get(PrismaService)
    await app.init()
  })

  test('[DELETE] /recipient/:recipientId', async () => {
    const recipient = await recipientFactory.makePrismaRecipient()

    const response = await request(app.getHttpServer()).delete(
      `/recipient/${recipient.id.toString()}`,
    )

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      message: 'Destinatário removido com sucesso!',
    })

    const userOnDatabase = await prisma.recipient.findUnique({
      where: {
        id: recipient.id.toString(),
      },
    })

    expect(userOnDatabase).toBeNull()
  })
})
