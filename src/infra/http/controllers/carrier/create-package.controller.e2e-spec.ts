import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AppModule } from '@/infra/app.module'
import { AccessToken } from '@/infra/auth/access-token/access-token'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'
import { RecipientFactory } from 'test/factories/make-recipient'
import { SessionFactory } from 'test/factories/make-session'
import { UserFactory } from 'test/factories/make-user'

describe('Create Package (E2E)', () => {
  let app: INestApplication
  let recipientFactory: RecipientFactory
  let prisma: PrismaService
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
    prisma = moduleRef.get(PrismaService)
    accessTokenService = moduleRef.get(AccessToken)
    userFactory = moduleRef.get(UserFactory)
    sessionFactory = moduleRef.get(SessionFactory)

    await app.init()
  })

  test('[POST] /package', async () => {
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
      .post('/package')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
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
