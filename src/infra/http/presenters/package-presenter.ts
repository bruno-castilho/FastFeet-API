import { Package } from '@/domain/carrier/enterprise/entities/package'

export class PackagePresenter {
  static toHTTP(pckg: Package) {
    return {
      id: pckg.id.toValue(),
      heightInCentimeters: pckg.heightInCentimeters,
      widthInCentimeters: pckg.widthInCentimeters,
      weightInGrams: pckg.weightInGrams,
      state: pckg.state,
      recipientId: pckg.recipientId.toString(),
      deliveredBy: pckg.deliveredBy?.toString() || null,
      createdAt: pckg.createdAt,
      postedAt: pckg.postedAt,
      pickedUpAt: pckg.pickedUpAt,
      deliveredAt: pckg.deliveredAt,
      returnedAt: pckg.returnedAt,
    }
  }
}
