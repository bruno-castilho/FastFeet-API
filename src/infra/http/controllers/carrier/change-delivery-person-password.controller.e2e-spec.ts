import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AppModule } from '@/infra/app.module'
import { AccessToken } from '@/infra/auth/access-token/access-token'
import { BcryptHasher } from '@/infra/cryptography/bcrypt-hasher'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'
import { DeliveryPersonFactory } from 'test/factories/make-delivery-person'
import { SessionFactory } from 'test/factories/make-session'
import { UserFactory } from 'test/factories/make-user'

describe('Change Delivery Person Password (E2E)', () => {
  let app: INestApplication
  let deliveryPersonFactory: DeliveryPersonFactory
  let prisma: PrismaService
  let bcryptHasher: BcryptHasher
  let accessTokenService: AccessToken
  let userFactory: UserFactory
  let sessionFactory: SessionFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [DeliveryPersonFactory, UserFactory, SessionFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    deliveryPersonFactory = moduleRef.get(DeliveryPersonFactory)
    prisma = moduleRef.get(PrismaService)
    bcryptHasher = moduleRef.get(BcryptHasher)
    accessTokenService = moduleRef.get(AccessToken)
    userFactory = moduleRef.get(UserFactory)
    sessionFactory = moduleRef.get(SessionFactory)
    await app.init()
  })

  test('[PATCH] /deliveryperson/:deliveryPersonId/password', async () => {
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

    const response = await request(app.getHttpServer())
      .patch(`/deliveryperson/${deliveryPerson.id.toValue()}/password`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        password: '@B123456',
      })

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      message: 'Senha atualizada com sucesso!',
    })

    const userOnDatabase = await prisma.user.findUnique({
      where: {
        id: deliveryPerson.id.toString(),
      },
    })

    await expect(
      bcryptHasher.compare('@B123456', userOnDatabase?.password ?? ''),
    ).resolves.toEqual(true)
  })
})
