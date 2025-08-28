export class PackageDoesNotExistsError extends Error {
  constructor(id: string) {
    super(`Encomenda "${id}" não encontrada.`)
  }
}
