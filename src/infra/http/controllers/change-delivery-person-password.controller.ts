import { Body, Controller, Param, Patch } from '@nestjs/common'
import z from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { ChangeDeliveryPersonPassword } from '@/infra/use-cases/carrier/change-delivery-person-password'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

const changeDeliveryPersonPasswordBodySchema = z.object({
  password: z
    .string()
    .trim()
    .min(8, { message: 'A senha deve ter no mínimo 8 caracteres' })
    .regex(/(?=.*[A-Z])/, {
      message: 'A senha deve conter pelo menos uma letra maiúscula',
    })
    .regex(/(?=.*[0-9])/, {
      message: 'A senha deve conter pelo menos um número',
    })
    .regex(/(?=.*[!@#$%^&*(),.?":{}|<>])/, {
      message: 'A senha deve conter pelo menos um símbolo especial',
    }),
})

type ChangeDeliveryPersonPasswordBodySchema = z.infer<
  typeof changeDeliveryPersonPasswordBodySchema
>

@ApiTags('Deliveryperson')
@Controller('/deliveryperson/:deliveryPersonId/password')
export class ChangeDeliveryPersonPasswordController {
  constructor(
    private changeDeliveryPersonPassword: ChangeDeliveryPersonPassword,
  ) {}

  @Patch()
  @ApiOperation({
    summary: 'Altera a senha de um entregador',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        password: { type: 'string', example: 'NovaSenha@123' },
      },
      required: ['password'],
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
        message: { type: 'string', example: 'Entregador não encontrado' },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciais inválidas',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Credenciais inválidas' },
      },
    },
  })
  async handle(
    @Param('deliveryPersonId') deliveryPersonId: string,
    @Body(new ZodValidationPipe(changeDeliveryPersonPasswordBodySchema))
    body: ChangeDeliveryPersonPasswordBodySchema,
  ) {
    const { password } = body

    await this.changeDeliveryPersonPassword.execute({
      deliveryPersonId,
      password,
    })

    return {
      message: 'Senha atualizada com sucesso!',
    }
  }
}
