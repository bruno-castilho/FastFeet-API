import { CPF } from '@/core/entities/value-objects/cpf'
import { HashGenerator } from '../cryptography/hash-generator'
import { UserRepository } from '../repositories/user-repository'
import { CPFAlreadyExistsError } from './errors/cpf-already-exists-error'
import { EmailAlreadyExistsError } from './errors/email-already-exists-error'
import { Email } from '@/core/entities/value-objects/email'
import { User } from '../../enterprise/entities/user'
import { Role } from '../../enterprise/entities/value-objects/role'

interface RegisterUserUseCaseRequest {
  firstName: string
  lastName: string
  role: 'ADMIN' | 'DELIVERY_PERSON'
  cpf: string
  email: string
  password: string
}

export class RegisterUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    firstName,
    lastName,
    role,
    cpf,
    email,
    password,
  }: RegisterUserUseCaseRequest) {
    const userWithSameEmail = await this.userRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new EmailAlreadyExistsError(email)
    }

    const userWithSameCpf = await this.userRepository.findByCPF(cpf)

    if (userWithSameCpf) {
      throw new CPFAlreadyExistsError(cpf)
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const user = User.create({
      firstName,
      lastName,
      role: Role.create(role),
      cpf: CPF.create(cpf),
      email: Email.create(email),
      password: hashedPassword,
    })

    await this.userRepository.create(user)
  }
}
