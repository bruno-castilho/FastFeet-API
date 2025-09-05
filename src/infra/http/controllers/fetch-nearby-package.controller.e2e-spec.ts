import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { DeliveryPersonFactory } from 'test/factories/make-delivery-person'
import { PackageFactory } from 'test/factories/make-package'
import { RecipientFactory } from 'test/factories/make-recipient'

describe('Fetch nearby packages (E2E)', () => {
  let app: INestApplication
  let deliveryPersonFactory: DeliveryPersonFactory
  let packageFactory: PackageFactory
  let recipientFactory: RecipientFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [DeliveryPersonFactory, PackageFactory, RecipientFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    deliveryPersonFactory = moduleRef.get(DeliveryPersonFactory)
    packageFactory = moduleRef.get(PackageFactory)
    recipientFactory = moduleRef.get(RecipientFactory)

    await app.init()
  })

  test('[GET] /packages/nearby', async () => {
    const deliveryPerson =
      await deliveryPersonFactory.makePrismaDeliveryPerson()

    const recipient = await recipientFactory.makePrismaRecipient({
      latitude: 0,
      longitude: 0,
    })

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
      .get(`/packages/nearby`)
      .query({
        latitude: 0,
        longitude: 0,
      })

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
