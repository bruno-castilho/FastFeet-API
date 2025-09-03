import { GetRecipientUseCase } from '@/domain/carrier/application/use-cases/get-recipient'
import { Injectable } from '@nestjs/common'
import { PrismaRecipientRepository } from '../database/prisma/repositories/prisma-recipient-repository'

@Injectable()
export class GetRecipient extends GetRecipientUseCase {
  constructor(recipientRepository: PrismaRecipientRepository) {
    super(recipientRepository)
  }
}
