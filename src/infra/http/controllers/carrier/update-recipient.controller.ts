import { UpdateRecipient } from '@/infra/use-cases/carrier/update-recipient'
import { Body, Controller, Param, Put } from '@nestjs/common'
import z from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { isValidCEP } from '@/core/utils/isValidCEP'
import { isValidPhone } from '@/core/utils/isValidPhone'
import { UpdateRecipientDocs } from './docs/update-recipient.docs'
import { ApiTags } from '@nestjs/swagger'

const updateRecipientBodySchema = z.object({
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

type UpdateRecipientBodySchema = z.infer<typeof updateRecipientBodySchema>

@ApiTags('Recipient')
@Controller('/recipient/:recipientId')
export class UpdateRecipientController {
  constructor(private updateRecipient: UpdateRecipient) {}

  @Put()
  @UpdateRecipientDocs()
  async handle(
    @Body(new ZodValidationPipe(updateRecipientBodySchema))
    body: UpdateRecipientBodySchema,
    @Param('recipientId') recipientId: string,
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

    await this.updateRecipient.execute({
      recipientId,
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
      message: 'Destinatário atualizado com sucesso!',
    }
  }
}
