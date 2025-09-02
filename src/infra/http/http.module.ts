import { Module } from '@nestjs/common'
import { CreateDeliveryPersonController } from './controllers/create-delivery-person.controller'
import { UseCasesModule } from '../use-cases/use-cases.module'
import { FiltersModule } from './filters/filters.module'
import { UpdateDeliveryPersonController } from './controllers/update-delivery-person.controller'
import { RemoveDeliveryPersonController } from './controllers/remove-delivery-person.controller'

@Module({
  imports: [UseCasesModule, FiltersModule],
  controllers: [
    CreateDeliveryPersonController,
    UpdateDeliveryPersonController,
    RemoveDeliveryPersonController,
  ],
})
export class HTTPModule {}
