import { CreateRecipientUseCase } from '@/domain/carrier/application/use-cases/create-recipient'
import { Injectable } from '@nestjs/common'
import { PrismaRecipientRepository } from '../database/prisma/repositories/prisma-recipient-repository'
import { GeolocationCep } from '../cep/geolocation-cep'

@Injectable()
export class CreateRecipient extends CreateRecipientUseCase {
  constructor(
    recipientRepository: PrismaRecipientRepository,
    geolocationCEP: GeolocationCep,
  ) {
    super(recipientRepository, geolocationCEP)
  }
}
