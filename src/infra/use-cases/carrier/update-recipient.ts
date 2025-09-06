import { UpdateRecipientUseCase } from '@/domain/carrier/application/use-cases/update-recipient'
import { GeolocationCep } from '@/infra/cep/geolocation-cep'
import { PrismaRecipientRepository } from '@/infra/database/prisma/repositories/prisma-recipient-repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UpdateRecipient extends UpdateRecipientUseCase {
  constructor(
    recipientRepository: PrismaRecipientRepository,
    geolocationCEP: GeolocationCep,
  ) {
    super(recipientRepository, geolocationCEP)
  }
}
