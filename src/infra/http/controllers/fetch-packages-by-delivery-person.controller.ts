import { Controller, Get, Param, Query } from '@nestjs/common'
import { PackagePresenter } from '../presenters/package-presenter'
import z from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { FetchPackagesByDeliveryPerson } from '@/infra/use-cases/carrier/fetch-packages-by-delivery-person'
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'

const fetchPackagesByDeliveryPersonQuerySchema = z.object({
  page: z
    .string()
    .optional()
    .default('1')
    .transform(Number)
    .pipe(z.number().min(1)),
})

type FetchPackagesByDeliveryPersonQuerySchema = z.infer<
  typeof fetchPackagesByDeliveryPersonQuerySchema
>

@ApiTags('Deliveryperson')
@Controller('/deliveryperson/:deliveryPersonId/packages')
export class FetchPackagesByDeliveryPersonController {
  constructor(
    private fetchPackagesByDeliveryPerson: FetchPackagesByDeliveryPerson,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Lista encomendas de um entregador',
  })
  @ApiParam({
    name: 'deliveryPersonId',
    type: 'string',
    example: 'c7d6e5f4-4321-8765-9abc-abcdef654321',
    required: true,
    description: 'ID do entregador',
  })
  @ApiQuery({ name: 'page', type: Number, example: 1, required: false })
  @ApiResponse({
    status: 200,
    description: 'Lista de encomendas do entregador',
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
    @Query(new ZodValidationPipe(fetchPackagesByDeliveryPersonQuerySchema))
    query: FetchPackagesByDeliveryPersonQuerySchema,
    @Param('deliveryPersonId') deliveryPersonId: string,
  ) {
    const { page } = query

    const { packages } = await this.fetchPackagesByDeliveryPerson.execute({
      deliveryPersonId,
      page,
    })

    return {
      packages: packages.map(PackagePresenter.toHTTP),
    }
  }
}
