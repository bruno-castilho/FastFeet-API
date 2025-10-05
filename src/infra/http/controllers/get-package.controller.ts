import { GetPackage } from '@/infra/use-cases/carrier/get-package'
import { Controller, Get, Param } from '@nestjs/common'
import { PackagePresenter } from '../presenters/package-presenter'
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('Package')
@Controller('/package/:packageId')
export class GetPackageController {
  constructor(private getPackage: GetPackage) {}

  @Get()
  @ApiOperation({
    summary: 'Busca uma encomenda pelo ID',
  })
  @ApiParam({
    name: 'packageId',
    type: 'string',
    example: 'b1e2c3d4-5678-1234-9abc-1234567890ab',
    required: true,
    description: 'ID da encomenda',
  })
  @ApiResponse({
    status: 200,
    description: 'Encomenda encontrada',
    schema: {
      type: 'object',
      properties: {
        package: {
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
  @ApiResponse({
    status: 404,
    description: 'Encomenda não encontrada',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example:
            'Encomenda "b1e2c3d4-5678-1234-9abc-1234567890ab" não encontrada',
        },
      },
    },
  })
  async handle(@Param('packageId') packageId: string) {
    const { pckg } = await this.getPackage.execute({
      packageId,
    })

    return {
      package: PackagePresenter.toHTTP(pckg),
    }
  }
}
