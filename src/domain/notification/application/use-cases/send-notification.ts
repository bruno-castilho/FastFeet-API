import { SendMessage } from '../messaging/send-message'

export interface SendNotificationUseCaseRequest {
  email: string
  title: string
  content: string
}

export class SendNotificationUseCase {
  constructor(private sendMessage: SendMessage) {}

  async execute({ email, title, content }: SendNotificationUseCaseRequest) {
    await this.sendMessage.send(email, title, content)
  }
}
