import { CreateRecipientUseCase } from '@/domain/carrier/application/use-cases/create-recipient'
import { GeolocationCep } from '@/infra/cep/geolocation-cep'
import { PrismaRecipientRepository } from '@/infra/database/prisma/repositories/prisma-recipient-repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class CreateRecipient extends CreateRecipientUseCase {
  constructor(
    recipientRepository: PrismaRecipientRepository,
    geolocationCEP: GeolocationCep,
  ) {
    super(recipientRepository, geolocationCEP)
  }
}
