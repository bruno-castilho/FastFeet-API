import { User } from '../../enterprise/entities/user'

export interface UserRepository {
  findById(id: string): Promise<User | null>
  findByCPF(cpf: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  create(user: User): Promise<void>
}
