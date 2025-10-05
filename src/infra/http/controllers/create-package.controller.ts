import { CreatePackage } from '@/infra/use-cases/carrier/create-package'
import { Body, Controller, Post } from '@nestjs/common'
import z from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

const createPackageBodySchema = z.object({
  heightInCentimeters: z.coerce.number(),
  widthInCentimeters: z.coerce.number(),
  weightInGrams: z.coerce.number(),
  recipientId: z.uuid(),
})

type CreatePackageBodySchema = z.infer<typeof createPackageBodySchema>

@ApiTags('Package')
@Controller('/package')
export class CreatePackageController {
  constructor(private createPackage: CreatePackage) {}

  @Post()
  @ApiOperation({
    summary: 'Registra uma nova encomenda',
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
          format: 'uuid',
          example: 'b1e2c3d4-5678-1234-9abc-1234567890ab',
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
    status: 201,
    description: 'Encomenda registrada com sucesso',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Encomenda registrada com sucesso!',
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
    description: 'Destinatário não encontrado',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example:
            'Destinatário "b1e2c3d4-5678-1234-9abc-1234567890ab" não existe.',
        },
      },
    },
  })
  async handle(
    @Body(new ZodValidationPipe(createPackageBodySchema))
    body: CreatePackageBodySchema,
  ) {
    const {
      heightInCentimeters,
      recipientId,
      weightInGrams,
      widthInCentimeters,
    } = body

    await this.createPackage.execute({
      heightInCentimeters,
      recipientId,
      weightInGrams,
      widthInCentimeters,
    })

    return {
      message: 'Encomenda registrada com sucesso!',
    }
  }
}
