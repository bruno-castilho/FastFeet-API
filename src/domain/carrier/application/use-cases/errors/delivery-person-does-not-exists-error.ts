export class DeliveryPersonDoesNotExistsError extends Error {
  constructor(id: string) {
    super(`Entregador "${id}" não existe.`)
  }
}
