import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { DeliveryPersonFactory } from 'test/factories/make-delivery-person'

describe('Get Delivery Person (E2E)', () => {
  let app: INestApplication
  let deliveryPersonFactoryFactory: DeliveryPersonFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [DeliveryPersonFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    deliveryPersonFactoryFactory = moduleRef.get(DeliveryPersonFactory)

    await app.init()
  })

  test('[GET] /deliveryperson/:deliveryPersonId', async () => {
    const deliveryPerson =
      await deliveryPersonFactoryFactory.makePrismaDeliveryPerson()

    const response = await request(app.getHttpServer()).get(
      `/deliveryperson/${deliveryPerson.id.toValue()}`,
    )

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        deliveryPerson: expect.objectContaining({
          id: deliveryPerson.id.toValue(),
          cpf: deliveryPerson.cpf.value,
          email: deliveryPerson.email.value,
          firstName: deliveryPerson.firstName,
          lastName: deliveryPerson.lastName,
        }),
      }),
    )
  })
})
