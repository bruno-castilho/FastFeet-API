import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Package, State } from '@/domain/carrier/enterprise/entities/package'
import { Prisma, Package as PackagePrisma } from '@prisma/client'

export class PrismaPackageMapper {
  private static stateToPrisma(state: State) {
    if (state === State.DELIVERED) return 'DELIVERED'

    if (state === State.PENDING) return 'PENDING'

    if (state === State.PICKEDUP) return 'PICKEDUP'

    if (state === State.RETURNED) return 'RETURNED'

    return 'CREATED'
  }

  private static stateToDomain(state: string) {
    if (state === 'DELIVERED') return State.DELIVERED

    if (state === 'PENDING') return State.PENDING

    if (state === 'PICKEDUP') return State.PICKEDUP

    if (state === 'RETURNED') return State.RETURNED

    return State.CREATED
  }

  static toPrisma(raw: Package): Prisma.PackageUncheckedCreateInput {
    return {
      id: raw.id.toString(),
      heightInCentimeters: raw.heightInCentimeters,
      weightInGrams: raw.weightInGrams,
      widthInCentimeters: raw.widthInCentimeters,
      state: this.stateToPrisma(raw.state),
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
        state: State.CREATED,
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
