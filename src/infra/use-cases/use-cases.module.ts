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
import { CreatePackage } from './create-package'
import { UpdatePackage } from './update-package'
import { RemovePackage } from './remove-package'
import { GetPackage } from './get-package'

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
    CreatePackage,
    UpdatePackage,
    RemovePackage,
    GetPackage,
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
    CreatePackage,
    UpdatePackage,
    RemovePackage,
    GetPackage,
  ],
})
export class UseCasesModule {}
