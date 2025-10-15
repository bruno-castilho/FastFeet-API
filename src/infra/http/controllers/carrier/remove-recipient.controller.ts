import { RemoveRecipient } from '@/infra/use-cases/carrier/remove-recipient'
import { Controller, Param, Delete } from '@nestjs/common'
import { RemoveRecipientDocs } from './docs/remove-recipient.docs'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Recipient')
@Controller('/recipient/:recipientId')
export class RemoveRecipientController {
  constructor(private removeRecipient: RemoveRecipient) {}

  @Delete()
  @RemoveRecipientDocs()
  async handle(@Param('recipientId') recipientId: string) {
    await this.removeRecipient.execute({
      recipientId,
    })

    return {
      message: 'Destinatário removido com sucesso!',
    }
  }
}
