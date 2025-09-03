import { UpdateRecipientUseCase } from '@/domain/carrier/application/use-cases/update-recipient'
import { Injectable } from '@nestjs/common'
import { PrismaRecipientRepository } from '../database/prisma/repositories/prisma-recipient-repository'
import { GeolocationCep } from '../cep/geolocation-cep'

@Injectable()
export class UpdateRecipient extends UpdateRecipientUseCase {
  constructor(
    recipientRepository: PrismaRecipientRepository,
    geolocationCEP: GeolocationCep,
  ) {
    super(recipientRepository, geolocationCEP)
  }
}
