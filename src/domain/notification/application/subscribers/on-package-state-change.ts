import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { RecipientRepository } from '@/domain/carrier/application/repositories/recipient-repository'
import { PackageStateChangeEvent } from '@/domain/carrier/enterprise/events/package-state-change-event'
import { SendNotificationUseCase } from '@/domain/notification/application/use-cases/send-notification'

export class OnPackageStateChange implements EventHandler {
  constructor(
    private sendNotification: SendNotificationUseCase,
    private recipientRepository: RecipientRepository,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendPackageStateChangeNotification.bind(this),
      PackageStateChangeEvent.name,
    )
  }

  private async sendPackageStateChangeNotification({
    package: pckg,
    state,
  }: PackageStateChangeEvent) {
    const recipient = await this.recipientRepository.findById(
      pckg.recipientId.toValue(),
    )

    if (!recipient) return

    await this.sendNotification.execute({
      email: recipient.email.value,
      title: 'Sua encomenda teve o status atualizado',
      content: `O status da sua encomenda agora é: ${state}.`,
    })
  }
}
