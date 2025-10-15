import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AppModule } from '@/infra/app.module'
import { AccessToken } from '@/infra/auth/access-token/access-token'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'
import { DeliveryPersonFactory } from 'test/factories/make-delivery-person'
import { SessionFactory } from 'test/factories/make-session'
import { UserFactory } from 'test/factories/make-user'

describe('Remove Delivery Person (E2E)', () => {
  let app: INestApplication
  let deliveryPersonFactoryFactory: DeliveryPersonFactory
  let prisma: PrismaService
  let accessTokenService: AccessToken
  let userFactory: UserFactory
  let sessionFactory: SessionFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [DeliveryPersonFactory, UserFactory, SessionFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    deliveryPersonFactoryFactory = moduleRef.get(DeliveryPersonFactory)
    accessTokenService = moduleRef.get(AccessToken)
    userFactory = moduleRef.get(UserFactory)
    sessionFactory = moduleRef.get(SessionFactory)
    prisma = moduleRef.get(PrismaService)

    await app.init()
  })

  test('[DELETE] /deliveryperson/:deliveryPersonId', async () => {
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
      await deliveryPersonFactoryFactory.makePrismaDeliveryPerson()

    const response = await request(app.getHttpServer())
      .delete(`/deliveryperson/${deliveryPerson.id.toString()}`)
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      message: 'Entregador removido com sucesso!',
    })

    const userOnDatabase = await prisma.user.findUnique({
      where: {
        id: deliveryPerson.id.toString(),
      },
    })

    expect(userOnDatabase).toBeNull()
  })
})
