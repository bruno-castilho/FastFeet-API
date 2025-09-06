import { OnPackageStateChange } from '@/domain/notification/application/subscribers/on-package-state-change'
import { Injectable } from '@nestjs/common'
import { SendNotification } from '../use-cases/notification/send-notification'
import { PrismaRecipientRepository } from '../database/prisma/repositories/prisma-recipient-repository'

@Injectable()
export class OnPackageStateChangeEvent extends OnPackageStateChange {
  constructor(
    sendNotification: SendNotification,
    recipientRepository: PrismaRecipientRepository,
  ) {
    super(sendNotification, recipientRepository)
  }
}
