import { GetPackage } from '@/infra/use-cases/carrier/get-package'
import { Controller, Get, Param } from '@nestjs/common'
import { PackagePresenter } from '../../presenters/package-presenter'
import { GetPackageDocs } from './docs/get-package.docs'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Package')
@Controller('/package/:packageId')
export class GetPackageController {
  constructor(private getPackage: GetPackage) {}

  @Get()
  @GetPackageDocs()
  async handle(@Param('packageId') packageId: string) {
    const { pckg } = await this.getPackage.execute({
      packageId,
    })

    return {
      package: PackagePresenter.toHTTP(pckg),
    }
  }
}
