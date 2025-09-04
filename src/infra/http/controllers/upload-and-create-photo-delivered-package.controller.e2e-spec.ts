import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Upload And Create Photo of Delivered Package (E2E)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
    }).compile()

    app = moduleRef.createNestApplication()

    await app.init()
  })

  test('[POST] /photodeliveredpackage', async () => {
    const response = await request(app.getHttpServer())
      .post('/photodeliveredpackage')
      .attach('file', './test/e2e/sample-upload.png')

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      photoDeliveredPackageId: expect.any(String),
    })
  })
})
