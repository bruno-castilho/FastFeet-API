import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Package } from '@/domain/carrier/enterprise/entities/package'
import { Prisma, Package as PackagePrisma } from '@prisma/client'

export class PrismaPackageMapper {
  static toPrisma(raw: Package): Prisma.PackageUncheckedCreateInput {
    return {
      id: raw.id.toString(),
      heightInCentimeters: raw.heightInCentimeters,
      weightInGrams: raw.weightInGrams,
      widthInCentimeters: raw.widthInCentimeters,
      state: raw.state,
      createdAt: raw.createdAt,
      deliveredAt: raw.deliveredAt,
      pickedUpAt: raw.pickedUpAt,
      postedAt: raw.postedAt,
      returnedAt: raw.returnedAt,
      deliveredBy: raw.deliveredBy?.toString(),
      recipientId: raw.recipientId.toValue(),
    }
  }

  static toDomain(raw: PackagePrisma): Package {
    return Package.create(
      {
        heightInCentimeters: raw.heightInCentimeters,
        weightInGrams: raw.weightInGrams,
        widthInCentimeters: raw.widthInCentimeters,
        state: raw.state,
        createdAt: raw.createdAt,
        deliveredAt: raw.deliveredAt,
        pickedUpAt: raw.pickedUpAt,
        postedAt: raw.postedAt,
        returnedAt: raw.returnedAt,
        recipientId: new UniqueEntityID(raw.recipientId),
        deliveredBy: raw.deliveredBy
          ? new UniqueEntityID(raw.deliveredBy)
          : null,
      },
      new UniqueEntityID(raw.id),
    )
  }
}
