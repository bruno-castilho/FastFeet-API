import { AppModule } from '@/infra/app.module'
import { BcryptHasher } from '@/infra/cryptography/bcrypt-hasher'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { DeliveryPersonFactory } from 'test/factories/make-delivery-person'

describe('Change Delivery Person Password (E2E)', () => {
  let app: INestApplication
  let deliveryPersonFactoryFactory: DeliveryPersonFactory
  let prisma: PrismaService
  let bcryptHasher: BcryptHasher

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [DeliveryPersonFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    deliveryPersonFactoryFactory = moduleRef.get(DeliveryPersonFactory)
    prisma = moduleRef.get(PrismaService)
    bcryptHasher = moduleRef.get(BcryptHasher)
    await app.init()
  })

  test('[PATCH] /deliveryperson/:deliveryPersonId/password', async () => {
    const deliveryPerson =
      await deliveryPersonFactoryFactory.makePrismaDeliveryPerson()

    const response = await request(app.getHttpServer())
      .patch(`/deliveryperson/${deliveryPerson.id.toValue()}/password`)
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
