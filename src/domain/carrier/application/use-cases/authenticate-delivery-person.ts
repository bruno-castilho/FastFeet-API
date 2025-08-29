import { Encrypter } from '../cryptography/encrypter'
import { HashComparer } from '../cryptography/hash-comparer'
import { DeliveryPersonRepository } from '../repositories/delivery-person-repository'
import { WrongCredentialsError } from './errors/wrong-credentials-error'

interface AuthenticateDeliveryPersonUseCaseRequest {
  cpf: string
  password: string
}

export class AuthenticateDeliveryPersonUseCase {
  constructor(
    private DeliveryPersonRepository: DeliveryPersonRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({ cpf, password }: AuthenticateDeliveryPersonUseCaseRequest) {
    const deliveryPerson = await this.DeliveryPersonRepository.findByCPF(cpf)

    if (!deliveryPerson) throw new WrongCredentialsError()

    const isPasswordValid = await this.hashComparer.compare(
      password,
      deliveryPerson.password,
    )

    if (!isPasswordValid) throw new WrongCredentialsError()

    const accessToken = await this.encrypter.encrypt({
      sub: deliveryPerson.id.toString(),
    })

    return {
      accessToken,
    }
  }
}
