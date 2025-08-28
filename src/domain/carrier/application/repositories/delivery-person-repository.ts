import { DeliveryPerson } from '../../enterprise/entities/delivery-person'

export interface DeliveryPersonRepository {
  findById(id: string): Promise<DeliveryPerson | null>
  findByEmail(email: string): Promise<DeliveryPerson | null>
  findByCPF(cpf: string): Promise<DeliveryPerson | null>
  create(deliveryPerson: DeliveryPerson): Promise<void>
  save(deliveryPerson: DeliveryPerson): Promise<void>
}
