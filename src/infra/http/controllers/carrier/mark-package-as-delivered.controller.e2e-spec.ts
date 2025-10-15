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
import { PackageFactory } from 'test/factories/make-package'
import { PhotoDeliveredPackageFactory } from 'test/factories/make-photo-delivered-package'
import { RecipientFactory } from 'test/factories/make-recipient'
import { SessionFactory } from 'test/factories/make-session'
import { UserFactory } from 'test/factories/make-user'

describe('Mark Package As Delivered(E2E)', () => {
  let app: INestApplication
  let packageFactory: PackageFactory
  let recipientFactory: RecipientFactory
  let deliveryPersonFactory: DeliveryPersonFactory
  let photoDeliveredPackageFactory: PhotoDeliveredPackageFactory
  let prisma: PrismaService
  let accessTokenService: AccessToken
  let userFactory: UserFactory
  let sessionFactory: SessionFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        PackageFactory,
        RecipientFactory,
        DeliveryPersonFactory,
        PhotoDeliveredPackageFactory,
        UserFactory,
        SessionFactory,
      ],
    }).compile()

    app = moduleRef.createNestApplication()

    packageFactory = moduleRef.get(PackageFactory)
    recipientFactory = moduleRef.get(RecipientFactory)
    deliveryPersonFactory = moduleRef.get(DeliveryPersonFactory)
    photoDeliveredPackageFactory = moduleRef.get(PhotoDeliveredPackageFactory)
    prisma = moduleRef.get(PrismaService)
    accessTokenService = moduleRef.get(AccessToken)
    userFactory = moduleRef.get(UserFactory)
    sessionFactory = moduleRef.get(SessionFactory)

    await app.init()
  })

  test('[PATCH] /package/:packageId/delivered', async () => {
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
      .set('Authorization', `Bearer ${accessToken}`)
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
