import { SendMessage } from '@/domain/notification/application/messaging/send-message'

export class FakeSendMessage implements SendMessage {
  public items: { email: string; title: string; content: string }[] = []

  async send(email: string, title: string, content: string) {
    this.items.push({
      email,
      title,
      content,
    })
  }
}
