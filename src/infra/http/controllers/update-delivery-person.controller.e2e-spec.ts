import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { DeliveryPersonFactory } from 'test/factories/make-delivery-person'

describe('Update Delivery Person (E2E)', () => {
  let app: INestApplication
  let deliveryPersonFactoryFactory: DeliveryPersonFactory
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [DeliveryPersonFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    deliveryPersonFactoryFactory = moduleRef.get(DeliveryPersonFactory)
    prisma = moduleRef.get(PrismaService)
    await app.init()
  })

  test('[PUT] /deliveryperson/:deliveryPersonId', async () => {
    const deliveryPerson =
      await deliveryPersonFactoryFactory.makePrismaDeliveryPerson()

    const response = await request(app.getHttpServer())
      .put(`/deliveryperson/${deliveryPerson.id.toValue()}`)
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        cpf: '98765432100',
      })

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      message: 'Entregador atualizado com sucesso!',
    })

    const userOnDatabase = await prisma.user.findUnique({
      where: {
        id: deliveryPerson.id.toString(),
      },
    })

    expect(userOnDatabase).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        cpf: '98765432100',
      }),
    )
  })
})
