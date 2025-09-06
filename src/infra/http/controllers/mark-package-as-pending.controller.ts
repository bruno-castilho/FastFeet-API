import { Controller, Param, Patch } from '@nestjs/common'

import { MarkPackageAsPending } from '@/infra/use-cases/carrier/mark-package-as-pending'

@Controller('/package/:packageId/pending')
export class MarkPackageAsPendingController {
  constructor(private markPackageAsPending: MarkPackageAsPending) {}

  @Patch()
  async handle(@Param('packageId') packageId: string) {
    await this.markPackageAsPending.execute({
      packageId,
    })

    return {
      message: "Estado da encomenda alterado para 'Aguardando'",
    }
  }
}
