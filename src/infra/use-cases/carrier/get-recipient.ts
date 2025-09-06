import { GetRecipientUseCase } from '@/domain/carrier/application/use-cases/get-recipient'
import { PrismaRecipientRepository } from '@/infra/database/prisma/repositories/prisma-recipient-repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class GetRecipient extends GetRecipientUseCase {
  constructor(recipientRepository: PrismaRecipientRepository) {
    super(recipientRepository)
  }
}
