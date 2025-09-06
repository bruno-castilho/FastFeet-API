import { UpdateDeliveryPersonUseCase } from '@/domain/carrier/application/use-cases/update-delivery-person'
import { PrismaDeliveryPersonRepository } from '@/infra/database/prisma/repositories/prisma-delivery-person-repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UpdateDeliveryPerson extends UpdateDeliveryPersonUseCase {
  constructor(deliveryPersonRepository: PrismaDeliveryPersonRepository) {
    super(deliveryPersonRepository)
  }
}
