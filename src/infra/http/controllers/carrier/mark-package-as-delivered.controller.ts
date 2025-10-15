import { Body, Controller, Param, Patch } from '@nestjs/common'
import { MarkPackageAsDelivered } from '@/infra/use-cases/carrier/mark-package-as-delivered'
import z from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { MarkPackageAsDeliveredDocs } from './docs/mark-package-as-delivered.docs'
import { ApiTags } from '@nestjs/swagger'
import { Roles } from '@/infra/auth/decorators/roles.decorator'

const markPackageAsDeliveredBodySchema = z.object({
  deliveryPersonId: z.uuid(),
  photoDeliveredPackageId: z.uuid(),
})

type MarkPackageAsDeliveredBodySchema = z.infer<
  typeof markPackageAsDeliveredBodySchema
>

@ApiTags('Package')
@Roles('DELIVERY_PERSON')
@Controller('/package/:packageId/delivered')
export class MarkPackageAsDeliveredController {
  constructor(private markPackageAsDelivered: MarkPackageAsDelivered) {}

  @Patch()
  @MarkPackageAsDeliveredDocs()
  async handle(
    @Body(new ZodValidationPipe(markPackageAsDeliveredBodySchema))
    body: MarkPackageAsDeliveredBodySchema,
    @Param('packageId') packageId: string,
  ) {
    const { deliveryPersonId, photoDeliveredPackageId } = body

    await this.markPackageAsDelivered.execute({
      packageId,
      deliveryPersonId,
      photoDeliveredPackageId,
    })

    return {
      message: "Estado da encomenda alterado para 'Entregue'",
    }
  }
}
