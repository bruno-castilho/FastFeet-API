import { CreateRecipient } from '@/infra/use-cases/carrier/create-recipient'
import { Body, Controller, Post } from '@nestjs/common'
import z from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { isValidCEP } from '@/core/utils/isValidCEP'
import { isValidPhone } from '@/core/utils/isValidPhone'

const createRecipientBodySchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.email(),
  cep: z.string().refine(isValidCEP, { message: 'CEP inválido' }),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  neighborhood: z.string(),
  number: z.coerce.number(),
  phone: z.string().refine(isValidPhone, { message: 'Telefone inválido' }),
  streetAddress: z.string(),
  complement: z.string().optional(),
})

type CreateRecipientBodySchema = z.infer<typeof createRecipientBodySchema>

@Controller('/recipient')
export class CreateRecipientController {
  constructor(private createRecipient: CreateRecipient) {}

  @Post()
  async handle(
    @Body(new ZodValidationPipe(createRecipientBodySchema))
    body: CreateRecipientBodySchema,
  ) {
    const {
      firstName,
      lastName,
      email,
      cep,
      city,
      country,
      neighborhood,
      number,
      phone,
      state,
      streetAddress,
      complement,
    } = body

    await this.createRecipient.execute({
      firstName,
      lastName,
      email,
      cep,
      city,
      country,
      neighborhood,
      number,
      phone,
      state,
      streetAddress,
      complement,
    })

    return {
      message: 'Destinatário registrado com sucesso!',
    }
  }
}
