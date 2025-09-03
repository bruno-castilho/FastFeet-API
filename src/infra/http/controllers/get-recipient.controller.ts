import { GetRecipient } from '@/infra/use-cases/get-recipient'
import { Controller, Get, Param } from '@nestjs/common'
import { RecipientPresenter } from '../presenters/recipient-presenter'

@Controller('/recipient/:recipientId')
export class GetRecipientController {
  constructor(private getRecipient: GetRecipient) {}

  @Get()
  async handle(@Param('recipientId') recipientId: string) {
    const { recipient } = await this.getRecipient.execute({
      recipientId,
    })

    return {
      recipient: RecipientPresenter.toHTTP(recipient),
    }
  }
}
