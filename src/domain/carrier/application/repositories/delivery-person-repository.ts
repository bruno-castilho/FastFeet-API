import { DeliveryPerson } from '../../enterprise/entities/delivery-person'

export interface DeliveryPersonRepository {
  findByEmail(email: string): Promise<DeliveryPerson | null>
  findByCPF(cpf: string): Promise<DeliveryPerson | null>
  create(deliveryPerson: DeliveryPerson): Promise<void>
}
