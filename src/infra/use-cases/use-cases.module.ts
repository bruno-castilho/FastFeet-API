import { Module } from '@nestjs/common'
import { CreateDeliveryPerson } from './create-delivery-person'
import { DatabaseModule } from '../database/database.module'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { UpdateDeliveryPerson } from './update-delivery-person'
import { RemoveDeliveryPerson } from './remove-delivery-person'
import { GetDeliveryPerson } from './get-delivery-person'
import { ChangeDeliveryPersonPassword } from './change-delivery-person-password'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  providers: [
    CreateDeliveryPerson,
    UpdateDeliveryPerson,
    RemoveDeliveryPerson,
    GetDeliveryPerson,
    ChangeDeliveryPersonPassword,
  ],
  exports: [
    CreateDeliveryPerson,
    UpdateDeliveryPerson,
    RemoveDeliveryPerson,
    GetDeliveryPerson,
    ChangeDeliveryPersonPassword,
  ],
})
export class UseCasesModule {}
