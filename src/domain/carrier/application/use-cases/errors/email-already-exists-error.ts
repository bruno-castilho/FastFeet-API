export class EmailAlreadyExistsError extends Error {
  constructor(email: string) {
    super(`E-mail "${email}" já cadastrado.`)
  }
}
