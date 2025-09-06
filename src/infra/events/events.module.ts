import { DatabaseModule } from '../database/database.module'
import { UseCasesModule } from '../use-cases/use-cases.module'
import { OnPackageStateChangeEvent } from './on-package-state-change'
import { Module } from '@nestjs/common'

@Module({
  imports: [DatabaseModule, UseCasesModule],
  providers: [OnPackageStateChangeEvent],
})
export class EventsModule {}
