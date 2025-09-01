import { Module } from '@nestjs/common'
import { ZodExceptionFilter } from './zod-exception.filter'
import { EmailAlreadyExistsExceptionFilter } from './email-already-exists-exception.filter'
import { CPFAlreadyExistsExceptionFilter } from './cpf-already-exists-exception.filter'
import { APP_FILTER } from '@nestjs/core'

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
  ],
})
export class FiltersModule {}
