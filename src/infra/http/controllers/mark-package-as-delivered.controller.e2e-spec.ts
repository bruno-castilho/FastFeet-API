import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { DeliveryPersonFactory } from 'test/factories/make-delivery-person'
import { PackageFactory } from 'test/factories/make-package'
import { PhotoDeliveredPackageFactory } from 'test/factories/make-photo-delivered-package'
import { RecipientFactory } from 'test/factories/make-recipient'

describe('Mark Package As Delivered(E2E)', () => {
  let app: INestApplication
  let packageFactory: PackageFactory
  let recipientFactory: RecipientFactory
  let deliveryPersonFactory: DeliveryPersonFactory
  let photoDeliveredPackageFactory: PhotoDeliveredPackageFactory
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        PackageFactory,
        RecipientFactory,
        DeliveryPersonFactory,
        PhotoDeliveredPackageFactory,
      ],
    }).compile()

    app = moduleRef.createNestApplication()

    packageFactory = moduleRef.get(PackageFactory)
    recipientFactory = moduleRef.get(RecipientFactory)
    deliveryPersonFactory = moduleRef.get(DeliveryPersonFactory)
    photoDeliveredPackageFactory = moduleRef.get(PhotoDeliveredPackageFactory)
    prisma = moduleRef.get(PrismaService)

    await app.init()
  })

  test('[PATCH] /package/:packageId/delivered', async () => {
    const deliverPerson = await deliveryPersonFactory.makePrismaDeliveryPerson()

    const recipient = await recipientFactory.makePrismaRecipient()

    const pckg = await packageFactory.makePrismaPackage({
      recipientId: recipient.id,
      deliveredBy: deliverPerson.id,
    })

    const photoDeliveredPackage =
      await photoDeliveredPackageFactory.makePrismaPhotoDeliveredPackage()

    const response = await request(app.getHttpServer())
      .patch(`/package/${pckg.id.toValue()}/delivered`)
      .send({
        deliveryPersonId: deliverPerson.id.toString(),
        photoDeliveredPackageId: photoDeliveredPackage.id.toString(),
      })

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        message: "Estado da encomenda alterado para 'Entregue'",
      }),
    )

    const photoDeliveredPackageOnDatabase =
      await prisma.photoDeliveredPackage.findUnique({
        where: {
          id: photoDeliveredPackage.id.toString(),
        },
      })

    expect(photoDeliveredPackageOnDatabase).toEqual(
      expect.objectContaining({
        id: photoDeliveredPackage.id.toString(),
        packageId: pckg.id.toString(),
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
        state: 'DELIVERED',
        deliveredAt: expect.any(Date),
      }),
    )
  })
})
