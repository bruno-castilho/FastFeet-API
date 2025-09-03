import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { RecipientFactory } from 'test/factories/make-recipient'

describe('Get Recipient (E2E)', () => {
  let app: INestApplication
  let recipientFactory: RecipientFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [RecipientFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    recipientFactory = moduleRef.get(RecipientFactory)

    await app.init()
  })

  test('[GET] /recipient/:recipientId', async () => {
    const recipient = await recipientFactory.makePrismaRecipient()

    const response = await request(app.getHttpServer()).get(
      `/recipient/${recipient.id.toValue()}`,
    )

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        recipient: expect.objectContaining({
          id: recipient.id.toValue(),
          firstName: recipient.firstName,
          lastName: recipient.lastName,
          email: recipient.email.value,
          phone: recipient.phone.value,
          cep: recipient.cep.value,
          streetAddress: recipient.streetAddress,
          number: recipient.number,
          complement: recipient.complement,
          neighborhood: recipient.neighborhood,
          city: recipient.city,
          state: recipient.state,
          country: recipient.country,
          latitude: recipient.latitude,
          longitude: recipient.longitude,
        }),
      }),
    )
  })
})
