import { InvalidPhotoDeliveredPackageTypeError } from '@/domain/carrier/application/use-cases/errors/invalid-photo-delivered-package-type-error'
import { Catch, ExceptionFilter, NotFoundException } from '@nestjs/common'

@Catch(InvalidPhotoDeliveredPackageTypeError)
export class InvalidPhotoDeliveredPackageTypeExceptionFilter
  implements ExceptionFilter
{
  catch(error: InvalidPhotoDeliveredPackageTypeError) {
    throw new NotFoundException(error.message)
  }
}
