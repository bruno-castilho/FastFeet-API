import { Encrypter } from '../cryptography/encrypter'
import { HashComparer } from '../cryptography/hash-comparer'
import { AdminRepository } from '../repositories/admin-repository'

import { WrongCredentialsError } from './errors/wrong-credentials-error'

interface AuthenticateAdminUseCaseRequest {
  cpf: string
  password: string
}

export class AuthenticateAdminUseCase {
  constructor(
    private adminRepository: AdminRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({ cpf, password }: AuthenticateAdminUseCaseRequest) {
    const admin = await this.adminRepository.findByCPF(cpf)

    if (!admin) throw new WrongCredentialsError()

    const isPasswordValid = await this.hashComparer.compare(
      password,
      admin.password,
    )

    if (!isPasswordValid) throw new WrongCredentialsError()

    const accessToken = await this.encrypter.encrypt({
      sub: admin.id.toString(),
      role: 'ADMIN',
    })

    return {
      accessToken,
    }
  }
}
