import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { PackageFactory } from 'test/factories/make-package'
import { RecipientFactory } from 'test/factories/make-recipient'

describe('Mark Package As Pending(E2E)', () => {
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

  test('[PATCH] /package/:packageId/pending', async () => {
    const recipient = await recipientFactory.makePrismaRecipient()

    const pckg = await packageFactory.makePrismaPackage({
      recipientId: recipient.id,
    })

    const response = await request(app.getHttpServer()).patch(
      `/package/${pckg.id.toValue()}/pending`,
    )

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        message: "Estado da encomenda alterado para 'Aguardando'",
      }),
    )

    const packageOnDatabase = await prisma.package.findUnique({
      where: {
        id: pckg.id.toString(),
      },
    })

    expect(packageOnDatabase).toEqual(
      expect.objectContaining({
        id: pckg.id.toString(),
        state: 'PENDING',
      }),
    )
  })
})
