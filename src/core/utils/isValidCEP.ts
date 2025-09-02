export function isValidCEP(cep: string) {
  const regex = /^\d{5}-?\d{3}$/
  return regex.test(cep)
}
