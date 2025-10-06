import { Admin } from '../../enterprise/entities/admin'

export interface AdminRepository {
  findByCPF(cpf: string): Promise<Admin | null>
}
