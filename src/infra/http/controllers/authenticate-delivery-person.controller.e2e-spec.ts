import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { DeliveryPersonFactory } from 'test/factories/make-delivery-person'
import request from 'supertest'
import { hash } from 'bcryptjs'

describe('Authenticate Delivery Person(E2E)', () => {
  let app: INestApplication
  let deliveryPersonFactory: DeliveryPersonFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [DeliveryPersonFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    deliveryPersonFactory = moduleRef.get(DeliveryPersonFactory)

    await app.init()
  })

  test('[POST] /auth/deliveryperson', async () => {
    const deliveryPerson = await deliveryPersonFactory.makePrismaDeliveryPerson(
      {
        password: await hash('@B123456', 8),
      },
    )

    const response = await request(app.getHttpServer())
      .post('/auth/deliveryperson')
      .send({
        cpf: deliveryPerson.cpf.value,
        password: '@B123456',
      })

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      message: 'Bem Vindo!',
      accessToken: expect.any(String),
    })
  })
})
