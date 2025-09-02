import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { randomUUID } from 'node:crypto'
import request from 'supertest'

describe('Get Delivery Person (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)

    await app.init()
  })

  test('[GET] /deliveryperson/:deliveryPersonId', async () => {
    const deliveryPersonId = randomUUID()

    await prisma.user.create({
      data: {
        id: deliveryPersonId,
        cpf: '98765432100',
        email: 'john@example.com',
        firstName: 'firstName',
        lastName: 'lastName',
        password: 'password',
      },
    })

    const response = await request(app.getHttpServer()).get(
      `/deliveryperson/${deliveryPersonId}`,
    )

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        deliveryPerson: expect.objectContaining({
          id: deliveryPersonId,
          cpf: '98765432100',
          email: 'john@example.com',
          firstName: 'firstName',
          lastName: 'lastName',
        }),
      }),
    )
  })
})
