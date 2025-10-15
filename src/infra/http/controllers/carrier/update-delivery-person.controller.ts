import { UpdateDeliveryPerson } from '@/infra/use-cases/carrier/update-delivery-person'
import { Body, Controller, Param, Put } from '@nestjs/common'
import z from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { isValidCPF } from '@/core/utils/isValidCPF'
import { UpdateDeliveryPersonDocs } from './docs/update-delivery-person.docs'
import { ApiTags } from '@nestjs/swagger'

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
  @UpdateDeliveryPersonDocs()
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
