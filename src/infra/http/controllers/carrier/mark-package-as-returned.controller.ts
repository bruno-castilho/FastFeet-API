import { Controller, Param, Patch } from '@nestjs/common'

import { MarkPackageAsReturned } from '@/infra/use-cases/carrier/mark-package-as-returned'
import { MarkPackageAsReturnedDocs } from './docs/mark-package-as-returned.docs'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Package')
@Controller('/package/:packageId/returned')
export class MarkPackageAsReturnedController {
  constructor(private markPackageAsReturned: MarkPackageAsReturned) {}

  @Patch()
  @MarkPackageAsReturnedDocs()
  async handle(@Param('packageId') packageId: string) {
    await this.markPackageAsReturned.execute({
      packageId,
    })

    return {
      message: "Estado da encomenda alterado para 'Retornado'",
    }
  }
}
