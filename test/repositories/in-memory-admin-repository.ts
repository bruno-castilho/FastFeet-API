import { AdminRepository } from '@/domain/carrier/application/repositories/admin-repository'
import { Admin } from '@/domain/carrier/enterprise/entities/admin'

export class InMemoryAdminRepository implements AdminRepository {
  public items: Admin[] = []

  async findByCPF(cpf: string) {
    const admin = this.items.find((item) => item.cpf.value === cpf)

    if (!admin) {
      return null
    }

    return admin
  }
}
