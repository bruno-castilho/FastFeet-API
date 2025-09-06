import { RemoveRecipientUseCase } from '@/domain/carrier/application/use-cases/remove-recipient'
import { PrismaRecipientRepository } from '@/infra/database/prisma/repositories/prisma-recipient-repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class RemoveRecipient extends RemoveRecipientUseCase {
  constructor(recipientRepository: PrismaRecipientRepository) {
    super(recipientRepository)
  }
}
