import { RemoveRecipientUseCase } from '@/domain/carrier/application/use-cases/remove-recipient'
import { Injectable } from '@nestjs/common'
import { PrismaRecipientRepository } from '../database/prisma/repositories/prisma-recipient-repository'

@Injectable()
export class RemoveRecipient extends RemoveRecipientUseCase {
  constructor(recipientRepository: PrismaRecipientRepository) {
    super(recipientRepository)
  }
}
