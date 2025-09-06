import { Injectable } from '@nestjs/common'
import { RemoveDeliveryPersonUseCase } from '@/domain/carrier/application/use-cases/remove-delivery-person'
import { PrismaDeliveryPersonRepository } from '@/infra/database/prisma/repositories/prisma-delivery-person-repository'

@Injectable()
export class RemoveDeliveryPerson extends RemoveDeliveryPersonUseCase {
  constructor(deliveryPersonRepository: PrismaDeliveryPersonRepository) {
    super(deliveryPersonRepository)
  }
}
