import { UpdatePackage } from '@/infra/use-cases/carrier/update-package'
import { Body, Controller, Param, Put } from '@nestjs/common'
import z from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'

const updatePackageBodySchema = z.object({
  heightInCentimeters: z.coerce.number(),
  widthInCentimeters: z.coerce.number(),
  weightInGrams: z.coerce.number(),
  recipientId: z.uuid(),
})

type UpdatePackageBodySchema = z.infer<typeof updatePackageBodySchema>

@ApiTags('Package')
@Controller('/package/:packageId')
export class UpdatePackageController {
  constructor(private updatePackage: UpdatePackage) {}

  @Put()
  @ApiOperation({
    summary: 'Atualiza os dados de uma encomenda',
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
        heightInCentimeters: { type: 'number', example: 30 },
        widthInCentimeters: { type: 'number', example: 20 },
        weightInGrams: { type: 'number', example: 1500 },
        recipientId: {
          type: 'string',
          example: 'a9f8e7d6-1234-5678-9abc-abcdef123456',
        },
      },
      required: [
        'heightInCentimeters',
        'widthInCentimeters',
        'weightInGrams',
        'recipientId',
      ],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Encomenda atualizada com sucesso',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Encomenda atualizada com sucesso!',
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
  @ApiResponse({
    status: 406,
    description: 'Destinatário não encontrado',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example:
            'Destinatário "a9f8e7d6-1234-5678-9abc-abcdef123456" não encontrado',
        },
      },
    },
  })
  async handle(
    @Body(new ZodValidationPipe(updatePackageBodySchema))
    body: UpdatePackageBodySchema,
    @Param('packageId') packageId: string,
  ) {
    const {
      heightInCentimeters,
      recipientId,
      weightInGrams,
      widthInCentimeters,
    } = body

    await this.updatePackage.execute({
      packageId,
      heightInCentimeters,
      recipientId,
      weightInGrams,
      widthInCentimeters,
    })

    return {
      message: 'Encomenda atualizada com sucesso!',
    }
  }
}
