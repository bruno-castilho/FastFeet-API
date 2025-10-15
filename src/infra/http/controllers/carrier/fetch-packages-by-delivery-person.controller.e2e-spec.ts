import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AppModule } from '@/infra/app.module'
import { AccessToken } from '@/infra/auth/access-token/access-token'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'
import { DeliveryPersonFactory } from 'test/factories/make-delivery-person'
import { PackageFactory } from 'test/factories/make-package'
import { RecipientFactory } from 'test/factories/make-recipient'
import { SessionFactory } from 'test/factories/make-session'
import { UserFactory } from 'test/factories/make-user'

describe('Fetch packages by delivery person (E2E)', () => {
  let app: INestApplication
  let deliveryPersonFactory: DeliveryPersonFactory
  let packageFactory: PackageFactory
  let recipientFactory: RecipientFactory
  let accessTokenService: AccessToken
  let userFactory: UserFactory
  let sessionFactory: SessionFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        DeliveryPersonFactory,
        PackageFactory,
        RecipientFactory,
        UserFactory,
        SessionFactory,
      ],
    }).compile()

    app = moduleRef.createNestApplication()
    deliveryPersonFactory = moduleRef.get(DeliveryPersonFactory)
    packageFactory = moduleRef.get(PackageFactory)
    recipientFactory = moduleRef.get(RecipientFactory)
    accessTokenService = moduleRef.get(AccessToken)
    userFactory = moduleRef.get(UserFactory)
    sessionFactory = moduleRef.get(SessionFactory)

    await app.init()
  })

  test('[GET] /deliveryperson/:deliveryPersonId/packages', async () => {
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

    const deliveryPerson =
      await deliveryPersonFactory.makePrismaDeliveryPerson()

    const recipient = await recipientFactory.makePrismaRecipient()

    const [package1, package2] = await Promise.all([
      packageFactory.makePrismaPackage({
        deliveredBy: deliveryPerson.id,
        recipientId: recipient.id,
      }),
      packageFactory.makePrismaPackage({
        deliveredBy: deliveryPerson.id,
        recipientId: recipient.id,
      }),
    ])

    const response = await request(app.getHttpServer())
      .get(`/deliveryperson/${deliveryPerson.id.toString()}/packages`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      packages: expect.arrayContaining([
        expect.objectContaining({
          id: package1.id.toString(),
        }),
        expect.objectContaining({
          id: package2.id.toString(),
        }),
      ]),
    })
  })
})
