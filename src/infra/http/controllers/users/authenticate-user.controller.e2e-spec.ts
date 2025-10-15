import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'

import request from 'supertest'
import { hash } from 'bcryptjs'
import { UserFactory } from 'test/factories/make-user'

describe('Authenticate User(E2E)', () => {
  let app: INestApplication
  let userFactory: UserFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    userFactory = moduleRef.get(UserFactory)

    await app.init()
  })

  test('[POST] /users/login', async () => {
    const user = await userFactory.makePrismaUser({
      password: await hash('@B123456', 8),
    })

    const response = await request(app.getHttpServer())
      .post('/users/login')
      .set('User-Agent', 'E2E-Test-Agent/1.0')
      .send({
        cpf: user.cpf.value,
        password: '@B123456',
      })

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      message: 'Bem Vindo!',
      accessToken: expect.any(String),
      refreshToken: expect.any(String),
    })
  })
})
