import { UpdateDeliveryPerson } from '@/infra/use-cases/carrier/update-delivery-person'
import { Body, Controller, Param, Put } from '@nestjs/common'
import z from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { isValidCPF } from '@/core/utils/isValidCPF'
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'

const updateDeliveryPersonBodySchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  cpf: z.string().refine(isValidCPF, { message: 'CPF inválido' }),
  email: z.email(),
})

type UpdateDeliveryPersonBodySchema = z.infer<
  typeof updateDeliveryPersonBodySchema
>

@ApiTags('Deliveryperson')
@Controller('/deliveryperson/:deliveryPersonId')
export class UpdateDeliveryPersonController {
  constructor(private updateDeliveryPerson: UpdateDeliveryPerson) {}

  @Put()
  @ApiOperation({
    summary: 'Atualiza os dados de um entregador',
  })
  @ApiParam({
    name: 'deliveryPersonId',
    type: 'string',
    example: 'c7d6e5f4-4321-8765-9abc-abcdef654321',
    required: true,
    description: 'ID do entregador',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        firstName: { type: 'string', example: 'João' },
        lastName: { type: 'string', example: 'Silva' },
        cpf: { type: 'string', example: '39053344705' },
        email: { type: 'string', example: 'joao@email.com' },
      },
      required: ['firstName', 'lastName', 'cpf', 'email'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Entregador atualizado com sucesso',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Entregador atualizado com sucesso!',
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
    @Param('deliveryPersonId') deliveryPersonId: string,
    @Body(new ZodValidationPipe(updateDeliveryPersonBodySchema))
    body: UpdateDeliveryPersonBodySchema,
  ) {
    const { firstName, lastName, cpf, email } = body

    await this.updateDeliveryPerson.execute({
      deliveryPersonId,
      firstName,
      lastName,
      cpf,
      email,
    })

    return {
      message: 'Entregador atualizado com sucesso!',
    }
  }
}
