import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { RecipientFactory } from 'test/factories/make-recipient'

describe('Update Recipient (E2E)', () => {
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

  test('[PUT] /recipient/:recipientId', async () => {
    const recipient = await recipientFactory.makePrismaRecipient()

    const response = await request(app.getHttpServer())
      .put(`/recipient/${recipient.id.toValue()}`)
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        cep: '00000-001',
        city: 'Florianopólis',
        state: 'Santa Catarina',
        country: 'Brasil',
        neighborhood: 'Lagoa da Conceição',
        number: 0,
        phone: '00 000000000',
        streetAddress: 'Rua',
      })

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      message: 'Destinatário atualizado com sucesso!',
    })

    const recipientOnDatabase = await prisma.recipient.findUnique({
      where: {
        id: recipient.id.toString(),
      },
    })

    expect(recipientOnDatabase).toEqual(
      expect.objectContaining({
        id: recipient.id.toString(),
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        cep: '00000-001',
        city: 'Florianopólis',
        state: 'Santa Catarina',
        country: 'Brasil',
        neighborhood: 'Lagoa da Conceição',
        number: 0,
        phone: '00 000000000',
        streetAddress: 'Rua',
      }),
    )
  })
})
