import { User } from '../../enterprise/entities/user'

export interface UserRepository {
  findByCPF(cpf: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  create(user: User): Promise<void>
}
