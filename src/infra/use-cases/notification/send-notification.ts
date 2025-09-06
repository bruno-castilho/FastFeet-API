import { Injectable } from '@nestjs/common'
import { SendNotificationUseCase } from '@/domain/notification/application/use-cases/send-notification'
import { MailService } from '@/infra/notification/mail/mail.service'

@Injectable()
export class SendNotification extends SendNotificationUseCase {
  constructor(sendMessage: MailService) {
    super(sendMessage)
  }
}
