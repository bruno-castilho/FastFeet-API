import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Create Recipient (E2E)', () => {
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

  test('[POST] /recipient', async () => {
    const response = await request(app.getHttpServer())
      .post('/recipient')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        cep: '00000-001',
        city: 'Florianopólis',
        state: 'Santa Catarina',
        country: 'Brasil',
        neighborhood: 'Lagoa da Conceição',
        number: 0,
        phone: '00 000000000',
        streetAddress: 'Rua',
      })

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      message: 'Destinatário registrado com sucesso!',
    })

    const userOnDatabase = await prisma.recipient.findUnique({
      where: {
        email: 'johndoe@example.com',
      },
    })

    expect(userOnDatabase).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        cep: '00000-001',
        city: 'Florianopólis',
        state: 'Santa Catarina',
        country: 'Brasil',
        neighborhood: 'Lagoa da Conceição',
        number: 0,
        phone: '00 000000000',
        streetAddress: 'Rua',
      }),
    )
  })
})
