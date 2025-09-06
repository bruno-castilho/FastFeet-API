import { Injectable } from '@nestjs/common'
import { GetDeliveryPersonUseCase } from '@/domain/carrier/application/use-cases/get-delivery-person'
import { PrismaDeliveryPersonRepository } from '@/infra/database/prisma/repositories/prisma-delivery-person-repository'

@Injectable()
export class GetDeliveryPerson extends GetDeliveryPersonUseCase {
  constructor(deliveryPersonRepository: PrismaDeliveryPersonRepository) {
    super(deliveryPersonRepository)
  }
}
