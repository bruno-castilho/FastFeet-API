import { Controller, Param, Patch } from '@nestjs/common'

import { MarkPackageAsReturned } from '@/infra/use-cases/carrier/mark-package-as-returned'

@Controller('/package/:packageId/returned')
export class MarkPackageAsReturnedController {
  constructor(private markPackageAsReturned: MarkPackageAsReturned) {}

  @Patch()
  async handle(@Param('packageId') packageId: string) {
    await this.markPackageAsReturned.execute({
      packageId,
    })

    return {
      message: "Estado da encomenda alterado para 'Retornado'",
    }
  }
}
