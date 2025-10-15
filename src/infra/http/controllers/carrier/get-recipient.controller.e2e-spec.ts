import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AppModule } from '@/infra/app.module'
import { AccessToken } from '@/infra/auth/access-token/access-token'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'
import { RecipientFactory } from 'test/factories/make-recipient'
import { SessionFactory } from 'test/factories/make-session'
import { UserFactory } from 'test/factories/make-user'

describe('Get Recipient (E2E)', () => {
  let app: INestApplication
  let recipientFactory: RecipientFactory
  let accessTokenService: AccessToken
  let userFactory: UserFactory
  let sessionFactory: SessionFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [RecipientFactory, UserFactory, SessionFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    recipientFactory = moduleRef.get(RecipientFactory)
    accessTokenService = moduleRef.get(AccessToken)
    userFactory = moduleRef.get(UserFactory)
    sessionFactory = moduleRef.get(SessionFactory)

    await app.init()
  })

  test('[GET] /recipient/:recipientId', async () => {
    const user = await userFactory.makePrismaUser({
      password: await hash('@B123456', 8),
    })

    const sessionId = new UniqueEntityID()

    const accessToken = await accessTokenService.signAsync({
      sub: user.id.toString(),
      role: user.role.value,
      sessionId: sessionId.toString(),
    })

    await sessionFactory.makePrismaSession(
      {
        accessToken,
        userId: user.id,
      },
      sessionId,
    )

    const recipient = await recipientFactory.makePrismaRecipient()

    const response = await request(app.getHttpServer())
      .get(`/recipient/${recipient.id.toValue()}`)
      .set('Authorization', `Bearer ${accessToken}`)

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
