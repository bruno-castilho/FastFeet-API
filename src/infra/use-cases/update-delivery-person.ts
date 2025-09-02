import { UpdateDeliveryPersonUseCase } from '@/domain/carrier/application/use-cases/update-delivery-person'
import { Injectable } from '@nestjs/common'
import { PrismaDeliveryPersonRepository } from '../database/prisma/repositories/prisma-delivery-person-repository'

@Injectable()
export class UpdateDeliveryPerson extends UpdateDeliveryPersonUseCase {
  constructor(deliveryPersonRepository: PrismaDeliveryPersonRepository) {
    super(deliveryPersonRepository)
  }
}
