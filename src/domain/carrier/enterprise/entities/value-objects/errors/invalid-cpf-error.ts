export class InvalidCPF extends Error {
  constructor() {
    super('CPF inválido.')
  }
}
