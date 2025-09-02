import { DeliveryPersonDoesNotExistsError } from '@/domain/carrier/application/use-cases/errors/delivery-person-does-not-exists-error'
import { Catch, ExceptionFilter, NotFoundException } from '@nestjs/common'

@Catch(DeliveryPersonDoesNotExistsError)
export class DeliveryPersonDoesNotExistsExceptionFilter
  implements ExceptionFilter
{
  catch(error: DeliveryPersonDoesNotExistsError) {
    throw new NotFoundException(error.message)
  }
}
