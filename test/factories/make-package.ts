import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Package,
  PackageProps,
  State,
} from '@/domain/carrier/enterprise/entities/package'
import { randomUUID } from 'node:crypto'
import { Injectable } from '@nestjs/common'
import { PrismaPackageMapper } from '@/infra/database/prisma/mappers/prisma-package-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

export function makePackage(
  override: Partial<PackageProps> = {},
  id?: UniqueEntityID,
) {
  const pckg = Package.create(
    {
      weightInGrams: faker.number.int({ max: 1000 }),
      heightInCentimeters: faker.number.int({ max: 1000 }),
      widthInCentimeters: faker.number.int({ max: 1000 }),
      recipientId: new UniqueEntityID(randomUUID()),
      state: State.CREATED,
      ...override,
    },
    id,
  )

  return pckg
}

@Injectable()
export class PackageFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaPackage(data: Partial<PackageProps> = {}): Promise<Package> {
    const pckg = makePackage(data)

    await this.prisma.package.create({
      data: PrismaPackageMapper.toPrisma(pckg),
    })

    return pckg
  }
}
