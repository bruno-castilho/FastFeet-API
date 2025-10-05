import { Body, Controller, Param, Patch } from '@nestjs/common'
import { MarkPackageAsPickedUp } from '@/infra/use-cases/carrier/mark-package-as-picked-up'
import z from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'

const markPackageAsPickedUpBodySchema = z.object({
  deliveryPersonId: z.uuid(),
})

type MarkPackageAsPickedUpBodySchema = z.infer<
  typeof markPackageAsPickedUpBodySchema
>

@ApiTags('Package')
@Controller('/package/:packageId/pickedup')
export class MarkPackageAsPickedUpController {
  constructor(private markPackageAsPickedUp: MarkPackageAsPickedUp) {}

  @Patch()
  @ApiOperation({
    summary: "Marca uma encomenda como 'Retirado'",
  })
  @ApiParam({
    name: 'packageId',
    type: 'string',
    example: 'b1e2c3d4-5678-1234-9abc-1234567890ab',
    required: true,
    description: 'ID da encomenda',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        deliveryPersonId: {
          type: 'string',
          example: 'c7d6e5f4-4321-8765-9abc-abcdef654321',
        },
      },
      required: ['deliveryPersonId'],
    },
  })
  @ApiResponse({
    status: 200,
    description: "Estado da encomenda alterado para 'Retirado'",
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: "Estado da encomenda alterado para 'Retirado'",
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
            'Encomenda  "b1e2c3d4-5678-1234-9abc-1234567890ab" não encontrada',
        },
      },
    },
  })
  @ApiResponse({
    status: 403,
    description: 'Entregador não encontrado',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example:
            'Entregador "c7d6e5f4-4321-8765-9abc-abcdef654321" não encontrado',
        },
      },
    },
  })
  async handle(
    @Body(new ZodValidationPipe(markPackageAsPickedUpBodySchema))
    body: MarkPackageAsPickedUpBodySchema,
    @Param('packageId') packageId: string,
  ) {
    const { deliveryPersonId } = body

    await this.markPackageAsPickedUp.execute({
      packageId,
      deliveryPersonId,
    })

    return {
      message: "Estado da encomenda alterado para 'Retirado'",
    }
  }
}
