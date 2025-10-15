import { Module } from '@nestjs/common'
import { ZodExceptionFilter } from './zod-exception.filter'
import { EmailAlreadyExistsExceptionFilter } from './email-already-exists-exception.filter'
import { CPFAlreadyExistsExceptionFilter } from './cpf-already-exists-exception.filter'
import { APP_FILTER } from '@nestjs/core'
import { DeliveryPersonDoesNotExistsExceptionFilter } from './delivery-person-does-not-exists-exception.filter'
import { InvalidCEPExceptionFilter } from './invalid-cep-exception.filter'
import { PackageDoesNotExistsExceptionFilter } from './package-does-not-exists-exception.filter'
import { InvalidPhotoDeliveredPackageTypeExceptionFilter } from './invalid-photo-delivered-package-type-exception.filter'
import { PhotoDeliveredPackageDoesNotExistsExceptionFilter } from './photo-delivered-package-does-not-exists-exception.filter'
import { DeliveryPersonIsNotPickedUpThePackageExceptionFilter } from './delivery-person-is-not-picked-up-the-package-exception.filter'
import { RecipientDoesNotExistsExceptionFilter } from './recipient-does-not-exists-exception.filter'
import { WrongCredentialsExceptionFilter } from './wrong-credentials-exception.filter'

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
      useClass: WrongCredentialsExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: CPFAlreadyExistsExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: DeliveryPersonDoesNotExistsExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: InvalidCEPExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: RecipientDoesNotExistsExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: PackageDoesNotExistsExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: InvalidPhotoDeliveredPackageTypeExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: PhotoDeliveredPackageDoesNotExistsExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: DeliveryPersonIsNotPickedUpThePackageExceptionFilter,
    },
  ],
})
export class FiltersModule {}
