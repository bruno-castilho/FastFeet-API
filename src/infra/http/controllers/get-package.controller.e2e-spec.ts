import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { PackageFactory } from 'test/factories/make-package'
import { RecipientFactory } from 'test/factories/make-recipient'

describe('Get Package (E2E)', () => {
  let app: INestApplication
  let packageFactory: PackageFactory
  let recipientFactory: RecipientFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [PackageFactory, RecipientFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    packageFactory = moduleRef.get(PackageFactory)
    recipientFactory = moduleRef.get(RecipientFactory)

    await app.init()
  })

  test('[GET] /package/:packageId', async () => {
    const recipient = await recipientFactory.makePrismaRecipient()

    const pckg = await packageFactory.makePrismaPackage({
      recipientId: recipient.id,
    })

    const response = await request(app.getHttpServer()).get(
      `/package/${pckg.id.toValue()}`,
    )

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        package: expect.objectContaining({
          id: pckg.id.toValue(),
          heightInCentimeters: pckg.heightInCentimeters,
          widthInCentimeters: pckg.widthInCentimeters,
          weightInGrams: pckg.weightInGrams,
          state: pckg.state,
          recipientId: pckg.recipientId.toString(),
          deliveredBy: pckg.deliveredBy?.toString() || null,
        }),
      }),
    )
  })
})
