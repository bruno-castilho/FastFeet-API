import { Module } from '@nestjs/common'
import { CreateDeliveryPerson } from './carrier/create-delivery-person'
import { DatabaseModule } from '../database/database.module'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { UpdateDeliveryPerson } from './carrier/update-delivery-person'
import { RemoveDeliveryPerson } from './carrier/remove-delivery-person'
import { GetDeliveryPerson } from './carrier/get-delivery-person'
import { ChangeDeliveryPersonPassword } from './carrier/change-delivery-person-password'
import { CepModule } from '../cep/cep.module'
import { CreateRecipient } from './carrier/create-recipient'
import { UpdateRecipient } from './carrier/update-recipient'
import { RemoveRecipient } from './carrier/remove-recipient'
import { GetRecipient } from './carrier/get-recipient'
import { CreatePackage } from './carrier/create-package'
import { UpdatePackage } from './carrier/update-package'
import { RemovePackage } from './carrier/remove-package'
import { GetPackage } from './carrier/get-package'
import { MarkPackageAsPending } from './carrier/mark-package-as-pending'
import { MarkPackageAsPickedUp } from './carrier/mark-package-as-picked-up'
import { MarkPackageAsReturned } from './carrier/mark-package-as-returned'
import { FetchPackagesByDeliveryPerson } from './carrier/fetch-packages-by-delivery-person'
import { StorageModule } from '../storage/storage.module'
import { MarkPackageAsDelivered } from './carrier/mark-package-as-delivered'
import { FetchNearbyPackage } from './carrier/fetch-nearby-package'
import { UploadAndCreatePhotoDeliveredPackage } from './carrier/upload-and-create-photo-delivered-package'
import { NotificationModule } from '../notification/notification.module'
import { SendNotification } from './notification/send-notification'
import { RegisterUser } from './users/register-user'
import { AuthenticateUser } from './users/authenticate-user'

@Module({
  imports: [
    DatabaseModule,
    CryptographyModule,
    CepModule,
    StorageModule,
    NotificationModule,
  ],
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
    MarkPackageAsPending,
    MarkPackageAsPickedUp,
    MarkPackageAsReturned,
    FetchPackagesByDeliveryPerson,
    UploadAndCreatePhotoDeliveredPackage,
    MarkPackageAsDelivered,
    FetchNearbyPackage,
    SendNotification,
    RegisterUser,
    AuthenticateUser,
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
    MarkPackageAsPending,
    MarkPackageAsPickedUp,
    MarkPackageAsReturned,
    FetchPackagesByDeliveryPerson,
    UploadAndCreatePhotoDeliveredPackage,
    MarkPackageAsDelivered,
    FetchNearbyPackage,
    SendNotification,
    RegisterUser,
    AuthenticateUser,
  ],
})
export class UseCasesModule {}
