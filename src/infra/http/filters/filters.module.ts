import { Module } from '@nestjs/common'
import { ZodExceptionFilter } from './zod-exception.filter'
import { EmailAlreadyExistsExceptionFilter } from './email-already-exists-exception.filter'
import { CPFAlreadyExistsExceptionFilter } from './cpf-already-exists-exception.filter'
import { APP_FILTER } from '@nestjs/core'
import { DeliveryPersonDoesNotExistsExceptionFilter } from './delivery-person-does-not-exists-exception.filter'

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: ZodExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: EmailAlreadyExistsExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: CPFAlreadyExistsExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: DeliveryPersonDoesNotExistsExceptionFilter,
    },
  ],
})
export class FiltersModule {}
