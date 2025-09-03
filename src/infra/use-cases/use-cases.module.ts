import { Module } from '@nestjs/common'
import { CreateDeliveryPerson } from './create-delivery-person'
import { DatabaseModule } from '../database/database.module'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { UpdateDeliveryPerson } from './update-delivery-person'
import { RemoveDeliveryPerson } from './remove-delivery-person'
import { GetDeliveryPerson } from './get-delivery-person'
import { ChangeDeliveryPersonPassword } from './change-delivery-person-password'
import { CepModule } from '../cep/cep.module'
import { CreateRecipient } from './create-recipient'
import { UpdateRecipient } from './update-recipient'
import { RemoveRecipient } from './remove-recipient'
import { GetRecipient } from './get-recipient'

@Module({
  imports: [DatabaseModule, CryptographyModule, CepModule],
  providers: [
    CreateDeliveryPerson,
    UpdateDeliveryPerson,
    RemoveDeliveryPerson,
    GetDeliveryPerson,
    ChangeDeliveryPersonPassword,
    CreateRecipient,
    UpdateRecipient,
    RemoveRecipient,
    GetRecipient,
  ],
  exports: [
    CreateDeliveryPerson,
    UpdateDeliveryPerson,
    RemoveDeliveryPerson,
    GetDeliveryPerson,
    ChangeDeliveryPersonPassword,
    CreateRecipient,
    UpdateRecipient,
    RemoveRecipient,
    GetRecipient,
  ],
})
export class UseCasesModule {}
