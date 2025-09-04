import { PhotoDeliveredPackageDoesNotExistsError } from '@/domain/carrier/application/use-cases/errors/photo-delivered-package-does-not-exists-error'
import { Catch, ExceptionFilter, NotFoundException } from '@nestjs/common'

@Catch(PhotoDeliveredPackageDoesNotExistsError)
export class PhotoDeliveredPackageDoesNotExistsExceptionFilter
  implements ExceptionFilter
{
  catch(error: PhotoDeliveredPackageDoesNotExistsError) {
    throw new NotFoundException(error.message)
  }
}
