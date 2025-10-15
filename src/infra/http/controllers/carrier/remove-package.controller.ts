import { RemovePackage } from '@/infra/use-cases/carrier/remove-package'
import { Controller, Param, Delete } from '@nestjs/common'
import { RemovePackageDocs } from './docs/remove-package.docs'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Package')
@Controller('/package/:packageId')
export class RemovePackageController {
  constructor(private removePackage: RemovePackage) {}

  @Delete()
  @RemovePackageDocs()
  async handle(@Param('packageId') packageId: string) {
    await this.removePackage.execute({
      packageId,
    })

    return {
      message: 'Encomenda removida com sucesso!',
    }
  }
}
