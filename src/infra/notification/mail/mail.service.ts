import { SendMessage } from '@/domain/notification/application/messaging/send-message'
import { EnvService } from '@/infra/env/env.service'
import { Injectable } from '@nestjs/common'
import nodemailer, { Transporter } from 'nodemailer'

@Injectable()
export class MailService implements SendMessage {
  private transporter: Transporter

  constructor(envService: EnvService) {
    this.transporter = nodemailer.createTransport({
      host: envService.get('SMTP_HOST'),
      port: envService.get('SMTP_PORT'),
      secure: true,
      auth: {
        user: envService.get('SMTP_AUTH_USER'),
        pass: envService.get('SMTP_AUTH_PASSWORD'),
      },
    })
  }

  async send(email: string, title: string, content: string): Promise<void> {
    await this.transporter.sendMail({
      from: `fastfeet@mail.com`,
      to: email,
      subject: title,
      text: content,
    })
  }
}
