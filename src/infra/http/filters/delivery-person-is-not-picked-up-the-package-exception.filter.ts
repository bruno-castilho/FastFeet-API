import { DeliveryPersonIsNotPickedUpThePackageError } from '@/domain/carrier/application/use-cases/errors/delivery-person-is-not-picked-up-the-package-error'
import { Catch, ExceptionFilter, NotFoundException } from '@nestjs/common'

@Catch(DeliveryPersonIsNotPickedUpThePackageError)
export class DeliveryPersonIsNotPickedUpThePackageExceptionFilter
  implements ExceptionFilter
{
  catch(error: DeliveryPersonIsNotPickedUpThePackageError) {
    throw new NotFoundException(error.message)
  }
}
