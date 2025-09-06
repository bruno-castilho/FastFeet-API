import { Controller, Get, Query } from '@nestjs/common'
import { PackagePresenter } from '../presenters/package-presenter'
import z from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { FetchNearbyPackage } from '@/infra/use-cases/carrier/fetch-nearby-package'

const fetchNearbyPackageQuerySchema = z.object({
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
  page: z
    .string()
    .optional()
    .default('1')
    .transform(Number)
    .pipe(z.number().min(1)),
})

type FetchNearbyPackageQuerySchema = z.infer<
  typeof fetchNearbyPackageQuerySchema
>

@Controller('/packages/nearby')
export class FetchNearbyPackageController {
  constructor(private fetchNearbyPackage: FetchNearbyPackage) {}

  @Get()
  async handle(
    @Query(new ZodValidationPipe(fetchNearbyPackageQuerySchema))
    query: FetchNearbyPackageQuerySchema,
  ) {
    const { page, latitude, longitude } = query

    const { packages } = await this.fetchNearbyPackage.execute({
      latitude,
      longitude,
      page,
    })

    return {
      packages: packages.map(PackagePresenter.toHTTP),
    }
  }
}
