import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { PackageFactory } from 'test/factories/make-package'
import { RecipientFactory } from 'test/factories/make-recipient'

describe('Update Package (E2E)', () => {
  let app: INestApplication
  let packageFactory: PackageFactory
  let recipientFactory: RecipientFactory
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [PackageFactory, RecipientFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    packageFactory = moduleRef.get(PackageFactory)
    recipientFactory = moduleRef.get(RecipientFactory)
    prisma = moduleRef.get(PrismaService)
    await app.init()
  })

  test('[PUT] /package/:packageId', async () => {
    const recipient = await recipientFactory.makePrismaRecipient()

    const pckg = await packageFactory.makePrismaPackage({
      recipientId: recipient.id,
    })

    const response = await request(app.getHttpServer())
      .put(`/package/${pckg.id.toValue()}`)
      .send({
        heightInCentimeters: 4,
        widthInCentimeters: 4,
        weightInGrams: 4,
        recipientId: recipient.id.toValue(),
      })

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      message: 'Encomenda atualizada com sucesso!',
    })

    const packageOnDatabase = await prisma.package.findUnique({
      where: {
        id: pckg.id.toString(),
      },
    })

    expect(packageOnDatabase).toEqual(
      expect.objectContaining({
        id: pckg.id.toString(),
        heightInCentimeters: 4,
        widthInCentimeters: 4,
        weightInGrams: 4,
        recipientId: recipient.id.toValue(),
      }),
    )
  })
})
