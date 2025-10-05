import { Controller, Get, Query } from '@nestjs/common'
import { PackagePresenter } from '../presenters/package-presenter'
import z from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { FetchNearbyPackage } from '@/infra/use-cases/carrier/fetch-nearby-package'
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'

const fetchNearbyPackageQuerySchema = z.object({
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
  page: z
    .string()
    .optional()
    .default('1')
    .transform(Number)
    .pipe(z.number().min(1)),
})

type FetchNearbyPackageQuerySchema = z.infer<
  typeof fetchNearbyPackageQuerySchema
>

@ApiTags('Package')
@Controller('/packages/nearby')
export class FetchNearbyPackageController {
  constructor(private fetchNearbyPackage: FetchNearbyPackage) {}

  @Get()
  @ApiOperation({
    summary: 'Lista encomendas próximas a uma localização',
  })
  @ApiQuery({
    name: 'latitude',
    type: Number,
    example: -23.55052,
    required: true,
  })
  @ApiQuery({
    name: 'longitude',
    type: Number,
    example: -46.633308,
    required: true,
  })
  @ApiQuery({ name: 'page', type: Number, example: 1, required: false })
  @ApiResponse({
    status: 200,
    description: 'Lista de encomendas próximas',
    schema: {
      type: 'object',
      properties: {
        packages: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                example: 'b1e2c3d4-5678-1234-9abc-1234567890ab',
              },
              heightInCentimeters: { type: 'number', example: 30 },
              widthInCentimeters: { type: 'number', example: 20 },
              weightInGrams: { type: 'number', example: 1500 },
              state: { type: 'string', example: 'CREATED' },
              recipientId: {
                type: 'string',
                example: 'a9f8e7d6-1234-5678-9abc-abcdef123456',
              },
              deliveredBy: {
                type: 'string',
                example: 'c7d6e5f4-4321-8765-9abc-abcdef654321',
                nullable: true,
              },
              createdAt: {
                type: 'string',
                format: 'date-time',
                example: '2024-01-01T12:00:00Z',
              },
              postedAt: {
                type: 'string',
                format: 'date-time',
                nullable: true,
                example: null,
              },
              pickedUpAt: {
                type: 'string',
                format: 'date-time',
                nullable: true,
                example: null,
              },
              deliveredAt: {
                type: 'string',
                format: 'date-time',
                nullable: true,
                example: null,
              },
              returnedAt: {
                type: 'string',
                format: 'date-time',
                nullable: true,
                example: null,
              },
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Parâmetros inválidos',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Erro de validação' },
        errors: { type: 'object' },
      },
    },
  })
  async handle(
    @Query(new ZodValidationPipe(fetchNearbyPackageQuerySchema))
    query: FetchNearbyPackageQuerySchema,
  ) {
    const { page, latitude, longitude } = query

    const { packages } = await this.fetchNearbyPackage.execute({
      latitude,
      longitude,
      page,
    })

    return {
      packages: packages.map(PackagePresenter.toHTTP),
    }
  }
}
