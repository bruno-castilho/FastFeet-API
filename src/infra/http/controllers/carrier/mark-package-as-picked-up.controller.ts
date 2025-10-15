import { Body, Controller, Param, Patch } from '@nestjs/common'
import { MarkPackageAsPickedUp } from '@/infra/use-cases/carrier/mark-package-as-picked-up'
import z from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { MarkPackageAsPickedUpDocs } from './docs/mark-package-as-picked-up.docs'
import { ApiTags } from '@nestjs/swagger'
import { Roles } from '@/infra/auth/decorators/roles.decorator'

const markPackageAsPickedUpBodySchema = z.object({
  deliveryPersonId: z.uuid(),
})

type MarkPackageAsPickedUpBodySchema = z.infer<
  typeof markPackageAsPickedUpBodySchema
>

@ApiTags('Package')
@Roles('DELIVERY_PERSON')
@Controller('/package/:packageId/pickedup')
export class MarkPackageAsPickedUpController {
  constructor(private markPackageAsPickedUp: MarkPackageAsPickedUp) {}

  @Patch()
  @MarkPackageAsPickedUpDocs()
  async handle(
    @Body(new ZodValidationPipe(markPackageAsPickedUpBodySchema))
    body: MarkPackageAsPickedUpBodySchema,
    @Param('packageId') packageId: string,
  ) {
    const { deliveryPersonId } = body

    await this.markPackageAsPickedUp.execute({
      packageId,
      deliveryPersonId,
    })

    return {
      message: "Estado da encomenda alterado para 'Retirado'",
    }
  }
}
