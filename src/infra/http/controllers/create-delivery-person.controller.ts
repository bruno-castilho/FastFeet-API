import { CreateDeliveryPerson } from '@/infra/use-cases/create-delivery-person'
import { Body, Controller, Post } from '@nestjs/common'
import z from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { isValidCPF } from '@/core/utils/isValidCPF'

const createDeliveryPersonBodySchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  cpf: z.string().refine(isValidCPF, { message: 'CPF inválido' }),
  email: z.email(),
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

type CreateDeliveryPersonBodySchema = z.infer<
  typeof createDeliveryPersonBodySchema
>

@Controller('/deliveryperson')
export class CreateDeliveryPersonController {
  constructor(private createDeliveryPerson: CreateDeliveryPerson) {}

  @Post()
  async handle(
    @Body(new ZodValidationPipe(createDeliveryPersonBodySchema))
    body: CreateDeliveryPersonBodySchema,
  ) {
    const { firstName, lastName, cpf, email, password } = body

    await this.createDeliveryPerson.execute({
      firstName,
      lastName,
      cpf,
      email,
      password,
    })

    return {
      message: 'Entregador registrado com sucesso!',
    }
  }
}
