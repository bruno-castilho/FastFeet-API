import { Injectable } from '@nestjs/common'
import { PrismaDeliveryPersonRepository } from '../database/prisma/repositories/prisma-delivery-person-repository'
import { GetDeliveryPersonUseCase } from '@/domain/carrier/application/use-cases/get-delivery-person'

@Injectable()
export class GetDeliveryPerson extends GetDeliveryPersonUseCase {
  constructor(deliveryPersonRepository: PrismaDeliveryPersonRepository) {
    super(deliveryPersonRepository)
  }
}
