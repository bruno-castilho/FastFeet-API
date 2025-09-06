import { RemoveRecipient } from '@/infra/use-cases/carrier/remove-recipient'
import { Controller, Param, Delete } from '@nestjs/common'

@Controller('/recipient/:recipientId')
export class RemoveRecipientController {
  constructor(private removeRecipient: RemoveRecipient) {}

  @Delete()
  async handle(@Param('recipientId') recipientId: string) {
    await this.removeRecipient.execute({
      recipientId,
    })

    return {
      message: 'Destinatário removido com sucesso!',
    }
  }
}
