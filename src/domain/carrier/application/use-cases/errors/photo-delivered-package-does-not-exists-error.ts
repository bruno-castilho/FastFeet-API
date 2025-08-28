export class PhotoDeliveredPackageDoesNotExistsError extends Error {
  constructor(id: string) {
    super(`Foto "${id}" não existe.`)
  }
}
