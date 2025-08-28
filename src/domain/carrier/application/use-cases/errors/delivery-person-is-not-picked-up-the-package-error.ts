export class DeliveryPersonIsNotPickedUpThePackageError extends Error {
  constructor() {
    super(
      `Somente o entregador que retirou a encomenda pode marcar ela como entregue.`,
    )
  }
}
