import { Module } from '@nestjs/common'
import { CreateDeliveryPersonController } from './controllers/create-delivery-person.controller'
import { UseCasesModule } from '../use-cases/use-cases.module'
import { FiltersModule } from './filters/filters.module'

@Module({
  imports: [UseCasesModule, FiltersModule],
  controllers: [CreateDeliveryPersonController],
})
export class HTTPModule {}
