import { CreatePackage } from '@/infra/use-cases/create-package'
import { Body, Controller, Post } from '@nestjs/common'
import z from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'

const createPackageBodySchema = z.object({
  heightInCentimeters: z.coerce.number(),
  widthInCentimeters: z.coerce.number(),
  weightInGrams: z.coerce.number(),
  recipientId: z.uuid(),
})

type CreatePackageBodySchema = z.infer<typeof createPackageBodySchema>

@Controller('/package')
export class CreatePackageController {
  constructor(private createPackage: CreatePackage) {}

  @Post()
  async handle(
    @Body(new ZodValidationPipe(createPackageBodySchema))
    body: CreatePackageBodySchema,
  ) {
    const {
      heightInCentimeters,
      recipientId,
      weightInGrams,
      widthInCentimeters,
    } = body

    await this.createPackage.execute({
      heightInCentimeters,
      recipientId,
      weightInGrams,
      widthInCentimeters,
    })

    return {
      message: 'Encomenda registrada com sucesso!',
    }
  }
}
