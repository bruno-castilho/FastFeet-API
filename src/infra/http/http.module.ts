import { Module } from '@nestjs/common'
import { UseCasesModule } from '../use-cases/use-cases.module'
import { FiltersModule } from './filters/filters.module'
import { CreateDeliveryPersonController } from './controllers/carrier/create-delivery-person.controller'
import { UpdateDeliveryPersonController } from './controllers/carrier/update-delivery-person.controller'
import { RemoveDeliveryPersonController } from './controllers/carrier/remove-delivery-person.controller'
import { GetDeliveryPersonController } from './controllers/carrier/get-delivery-person.controller'
import { ChangeDeliveryPersonPasswordController } from './controllers/carrier/change-delivery-person-password.controller'
import { CreateRecipientController } from './controllers/carrier/create-recipient.controller'
import { UpdateRecipientController } from './controllers/carrier/update-recipient.controller'
import { RemoveRecipientController } from './controllers/carrier/remove-recipient.controller'
import { GetRecipientController } from './controllers/carrier/get-recipient.controller'
import { CreatePackageController } from './controllers/carrier/create-package.controller'
import { UpdatePackageController } from './controllers/carrier/update-package.controller'
import { RemovePackageController } from './controllers/carrier/remove-package.controller'
import { GetPackageController } from './controllers/carrier/get-package.controller'
import { MarkPackageAsPendingController } from './controllers/carrier/mark-package-as-pending.controller'
import { MarkPackageAsPickedUpController } from './controllers/carrier/mark-package-as-picked-up.controller'
import { MarkPackageAsReturnedController } from './controllers/carrier/mark-package-as-returned.controller'
import { UploadAndCreatePhotoDeliveredPackageController } from './controllers/carrier/upload-and-create-photo-delivered-package.controller'
import { MarkPackageAsDeliveredController } from './controllers/carrier/mark-package-as-delivered.controller'
import { FetchNearbyPackageController } from './controllers/carrier/fetch-nearby-package.controller'
import { FetchPackagesByDeliveryPersonController } from './controllers/carrier/fetch-packages-by-delivery-person.controller'
import { RegisterUserController } from './controllers/users/register-user.controller'
import { AuthenticateUserController } from './controllers/users/authenticate-user.controller'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [UseCasesModule, FiltersModule, AuthModule],
  providers: [],
  controllers: [
    CreateDeliveryPersonController,
    UpdateDeliveryPersonController,
    RemoveDeliveryPersonController,
    GetDeliveryPersonController,
    ChangeDeliveryPersonPasswordController,
    CreateRecipientController,
    UpdateRecipientController,
    RemoveRecipientController,
    GetRecipientController,
    CreatePackageController,
    UpdatePackageController,
    RemovePackageController,
    GetPackageController,
    MarkPackageAsPendingController,
    MarkPackageAsPickedUpController,
    MarkPackageAsReturnedController,
    FetchPackagesByDeliveryPersonController,
    UploadAndCreatePhotoDeliveredPackageController,
    MarkPackageAsDeliveredController,
    FetchNearbyPackageController,
    RegisterUserController,
    AuthenticateUserController,
  ],
})
export class HTTPModule {}
