import { Body, Controller, Post } from '@nestjs/common'
import z from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { isValidCPF } from '@/core/utils/isValidCPF'
import { AuthenticateDeliveryPerson } from '@/infra/use-cases/carrier/authenticate-delivery-person'

const authenticateDeliveryPersonBodySchema = z.object({
  cpf: z.string().refine(isValidCPF, { message: 'CPF inválido' }),
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

type AuthenticateDeliveryPersonBodySchema = z.infer<
  typeof authenticateDeliveryPersonBodySchema
>

@Controller('/sessions')
export class AuthenticateDeliveryPersonController {
  constructor(private authenticateDeliveryPerson: AuthenticateDeliveryPerson) {}

  @Post()
  async handle(
    @Body(new ZodValidationPipe(authenticateDeliveryPersonBodySchema))
    body: AuthenticateDeliveryPersonBodySchema,
  ) {
    const { cpf, password } = body

    const { accessToken } = await this.authenticateDeliveryPerson.execute({
      cpf,
      password,
    })

    return {
      accessToken,
      message: 'Bem Vindo!',
    }
  }
}
