import { GetPackage } from '@/infra/use-cases/carrier/get-package'
import { Controller, Get, Param } from '@nestjs/common'
import { PackagePresenter } from '../presenters/package-presenter'

@Controller('/package/:packageId')
export class GetPackageController {
  constructor(private getPackage: GetPackage) {}

  @Get()
  async handle(@Param('packageId') packageId: string) {
    const { pckg } = await this.getPackage.execute({
      packageId,
    })

    return {
      package: PackagePresenter.toHTTP(pckg),
    }
  }
}
