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
import { MarkPackageAsPending } from './mark-package-as-pending'
import { MarkPackageAsPickedUp } from './mark-package-as-picked-up'
import { MarkPackageAsReturned } from './mark-package-as-returned'
import { FetchPackagesByDeliveryPerson } from './fetch-packages-by-delivery-person'
import { StorageModule } from '../storage/storage.module'
import { UploadAndCreatePhotoDeliveredPackage } from './upload-and-create-photo-delivered-package'
import { MarkPackageAsDelivered } from './mark-package-as-delivered'
import { FetchNearbyPackage } from './fetch-nearby-package'
import { AuthenticateDeliveryPerson } from './authenticate-delivery-person'

@Module({
  imports: [DatabaseModule, CryptographyModule, CepModule, StorageModule],
  providers: [
    AuthenticateDeliveryPerson,
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
    MarkPackageAsPending,
    MarkPackageAsPickedUp,
    MarkPackageAsReturned,
    FetchPackagesByDeliveryPerson,
    UploadAndCreatePhotoDeliveredPackage,
    MarkPackageAsDelivered,
    FetchNearbyPackage,
  ],
  exports: [
    AuthenticateDeliveryPerson,
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
    MarkPackageAsPending,
    MarkPackageAsPickedUp,
    MarkPackageAsReturned,
    FetchPackagesByDeliveryPerson,
    UploadAndCreatePhotoDeliveredPackage,
    MarkPackageAsDelivered,
    FetchNearbyPackage,
  ],
})
export class UseCasesModule {}
