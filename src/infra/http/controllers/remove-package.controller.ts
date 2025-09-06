import { RemovePackage } from '@/infra/use-cases/carrier/remove-package'
import { Controller, Param, Delete } from '@nestjs/common'

@Controller('/package/:packageId')
export class RemovePackageController {
  constructor(private removePackage: RemovePackage) {}

  @Delete()
  async handle(@Param('packageId') packageId: string) {
    await this.removePackage.execute({
      packageId,
    })

    return {
      message: 'Encomenda removida com sucesso!',
    }
  }
}
