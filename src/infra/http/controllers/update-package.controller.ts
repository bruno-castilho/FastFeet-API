import { UpdatePackage } from '@/infra/use-cases/carrier/update-package'
import { Body, Controller, Param, Put } from '@nestjs/common'
import z from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'

const updatePackageBodySchema = z.object({
  heightInCentimeters: z.coerce.number(),
  widthInCentimeters: z.coerce.number(),
  weightInGrams: z.coerce.number(),
  recipientId: z.uuid(),
})

type UpdatePackageBodySchema = z.infer<typeof updatePackageBodySchema>

@Controller('/package/:packageId')
export class UpdatePackageController {
  constructor(private updatePackage: UpdatePackage) {}

  @Put()
  async handle(
    @Body(new ZodValidationPipe(updatePackageBodySchema))
    body: UpdatePackageBodySchema,
    @Param('packageId') packageId: string,
  ) {
    const {
      heightInCentimeters,
      recipientId,
      weightInGrams,
      widthInCentimeters,
    } = body

    await this.updatePackage.execute({
      packageId,
      heightInCentimeters,
      recipientId,
      weightInGrams,
      widthInCentimeters,
    })

    return {
      message: 'Encomenda atualizada com sucesso!',
    }
  }
}
