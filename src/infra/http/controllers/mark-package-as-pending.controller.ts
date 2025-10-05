import { Controller, Param, Patch } from '@nestjs/common'

import { MarkPackageAsPending } from '@/infra/use-cases/carrier/mark-package-as-pending'
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('Package')
@Controller('/package/:packageId/pending')
export class MarkPackageAsPendingController {
  constructor(private markPackageAsPending: MarkPackageAsPending) {}

  @Patch()
  @ApiOperation({
    summary: "Marca uma encomenda como 'Aguardando'",
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
    description: "Estado da encomenda alterado para 'Aguardando'",
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: "Estado da encomenda alterado para 'Aguardando'",
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
    await this.markPackageAsPending.execute({
      packageId,
    })

    return {
      message: "Estado da encomenda alterado para 'Aguardando'",
    }
  }
}
