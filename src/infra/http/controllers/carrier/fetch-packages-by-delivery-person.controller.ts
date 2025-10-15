import { Controller, Get, Param, Query } from '@nestjs/common'
import { PackagePresenter } from '../../presenters/package-presenter'
import z from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { FetchPackagesByDeliveryPerson } from '@/infra/use-cases/carrier/fetch-packages-by-delivery-person'
import { FetchPackagesByDeliveryPersonDocs } from './docs/fetch-packages-by-delivery-person.docs'
import { ApiTags } from '@nestjs/swagger'
import { Roles } from '@/infra/auth/decorators/roles.decorator'

const fetchPackagesByDeliveryPersonQuerySchema = z.object({
  page: z
    .string()
    .optional()
    .default('1')
    .transform(Number)
    .pipe(z.number().min(1)),
})

type FetchPackagesByDeliveryPersonQuerySchema = z.infer<
  typeof fetchPackagesByDeliveryPersonQuerySchema
>
@ApiTags('Deliveryperson')
@Roles('DELIVERY_PERSON')
@Controller('/deliveryperson/:deliveryPersonId/packages')
export class FetchPackagesByDeliveryPersonController {
  constructor(
    private fetchPackagesByDeliveryPerson: FetchPackagesByDeliveryPerson,
  ) {}

  @Get()
  @FetchPackagesByDeliveryPersonDocs()
  async handle(
    @Query(new ZodValidationPipe(fetchPackagesByDeliveryPersonQuerySchema))
    query: FetchPackagesByDeliveryPersonQuerySchema,
    @Param('deliveryPersonId') deliveryPersonId: string,
  ) {
    const { page } = query

    const { packages } = await this.fetchPackagesByDeliveryPerson.execute({
      deliveryPersonId,
      page,
    })

    return {
      packages: packages.map(PackagePresenter.toHTTP),
    }
  }
}
