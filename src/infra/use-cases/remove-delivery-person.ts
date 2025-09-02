import { Injectable } from '@nestjs/common'
import { PrismaDeliveryPersonRepository } from '../database/prisma/repositories/prisma-delivery-person-repository'
import { RemoveDeliveryPersonUseCase } from '@/domain/carrier/application/use-cases/remove-delivery-person'

@Injectable()
export class RemoveDeliveryPerson extends RemoveDeliveryPersonUseCase {
  constructor(deliveryPersonRepository: PrismaDeliveryPersonRepository) {
    super(deliveryPersonRepository)
  }
}
