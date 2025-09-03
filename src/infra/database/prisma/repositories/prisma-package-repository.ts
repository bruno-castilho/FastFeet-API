import { PackageRepository } from '@/domain/carrier/application/repositories/package-repository'
import { PrismaService } from '../prisma.service'
import { Package } from '@/domain/carrier/enterprise/entities/package'
import { PrismaPackageMapper } from '../mappers/prisma-package-mapper'
import { Injectable } from '@nestjs/common'
import { PaginationParams } from '@/core/repositories/pagination-params'

@Injectable()
export class PrismaPackageRepository implements PackageRepository {
  constructor(private prismaService: PrismaService) {}

  async findById(id: string) {
    const pckg = await this.prismaService.package.findUnique({
      where: {
        id,
      },
    })

    if (!pckg) return null

    return PrismaPackageMapper.toDomain(pckg)
  }

  async create(pckg: Package) {
    const data = PrismaPackageMapper.toPrisma(pckg)

    await this.prismaService.package.create({
      data,
    })
  }

  async save(pckg: Package) {
    const data = PrismaPackageMapper.toPrisma(pckg)

    await this.prismaService.package.update({
      data,
      where: {
        id: data.id,
      },
    })
  }

  async delete(pckg: Package) {
    await this.prismaService.package.delete({
      where: {
        id: pckg.id.toString(),
      },
    })
  }

  async findManyByDeliveryPerson(
    deliveryPersonId: string,
    { page }: PaginationParams,
  ) {
    const packages = await this.prismaService.package.findMany({
      where: {
        deliveredBy: deliveryPersonId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return packages.map(PrismaPackageMapper.toDomain)
  }

  async findManyNearbyPanding(
    latitude: number,
    longitude: number,
    params: PaginationParams,
  ): Promise<Package[]> {
    throw new Error('Not implemented')
  }
}
