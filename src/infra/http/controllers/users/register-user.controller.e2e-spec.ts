import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Register User (E2E)', () => {
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

  test('[POST] /users', async () => {
    const response = await request(app.getHttpServer()).post('/users').send({
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      cpf: '39053344705',
      password: '@B123456',
      role: 'ADMIN',
    })

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      message: 'Usuário registrado com sucesso!',
    })

    const userOnDatabase = await prisma.user.findUnique({
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
        cpf: '39053344705',
      }),
    )
  })
})
