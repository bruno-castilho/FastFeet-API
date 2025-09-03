import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { RecipientFactory } from 'test/factories/make-recipient'

describe('Create Package (E2E)', () => {
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

  test('[POST] /package', async () => {
    const recipient = await recipientFactory.makePrismaRecipient()

    const response = await request(app.getHttpServer()).post('/package').send({
      heightInCentimeters: 4,
      widthInCentimeters: 4,
      weightInGrams: 4,
      recipientId: recipient.id.toValue(),
    })

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      message: 'Encomenda registrada com sucesso!',
    })

    const packageOnDatabase = await prisma.package.findFirst()

    expect(packageOnDatabase).toEqual(
      expect.objectContaining({
        heightInCentimeters: 4,
        widthInCentimeters: 4,
        weightInGrams: 4,
        recipientId: recipient.id.toValue(),
      }),
    )
  })
})
