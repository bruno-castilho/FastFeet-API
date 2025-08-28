export class PackageNotFoundError extends Error {
  constructor(id: string) {
    super(`Encomenda "${id}" não encontrada.`)
  }
}
