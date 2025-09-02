import { Module } from '@nestjs/common'
import { CreateDeliveryPerson } from './create-delivery-person'
import { DatabaseModule } from '../database/database.module'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { UpdateDeliveryPerson } from './update-delivery-person'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  providers: [CreateDeliveryPerson, UpdateDeliveryPerson],
  exports: [CreateDeliveryPerson, UpdateDeliveryPerson],
})
export class UseCasesModule {}
