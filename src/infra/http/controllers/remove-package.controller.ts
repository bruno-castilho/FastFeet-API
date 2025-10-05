import { RemovePackage } from '@/infra/use-cases/carrier/remove-package'
import { Controller, Param, Delete } from '@nestjs/common'
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('Package')
@Controller('/package/:packageId')
export class RemovePackageController {
  constructor(private removePackage: RemovePackage) {}

  @Delete()
  @ApiOperation({
    summary: 'Remove uma encomenda pelo ID',
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
    description: 'Encomenda removida com sucesso',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Encomenda removida com sucesso!',
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
    await this.removePackage.execute({
      packageId,
    })

    return {
      message: 'Encomenda removida com sucesso!',
    }
  }
}
