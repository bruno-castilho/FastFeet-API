import { Module } from '@nestjs/common'
import { CreateDeliveryPersonController } from './controllers/create-delivery-person.controller'
import { UseCasesModule } from '../use-cases/use-cases.module'
import { FiltersModule } from './filters/filters.module'
import { UpdateDeliveryPersonController } from './controllers/update-delivery-person.controller'
import { RemoveDeliveryPersonController } from './controllers/remove-delivery-person.controller'
import { GetDeliveryPersonController } from './controllers/get-delivery-person.controller'
import { ChangeDeliveryPersonPasswordController } from './controllers/change-delivery-person-password.controller'
import { CreateRecipientController } from './controllers/create-recipient.controller'

@Module({
  imports: [UseCasesModule, FiltersModule],
  controllers: [
    CreateDeliveryPersonController,
    UpdateDeliveryPersonController,
    RemoveDeliveryPersonController,
    GetDeliveryPersonController,
    ChangeDeliveryPersonPasswordController,
    CreateRecipientController,
  ],
})
export class HTTPModule {}
