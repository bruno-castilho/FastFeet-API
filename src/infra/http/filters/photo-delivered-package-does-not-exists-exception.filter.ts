import { PhotoDeliveredPackageDoesNotExistsError } from '@/domain/carrier/application/use-cases/errors/photo-delivered-package-does-not-exists-error'
import { Catch, ExceptionFilter, NotAcceptableException } from '@nestjs/common'

@Catch(PhotoDeliveredPackageDoesNotExistsError)
export class PhotoDeliveredPackageDoesNotExistsExceptionFilter
  implements ExceptionFilter
{
  catch(error: PhotoDeliveredPackageDoesNotExistsError) {
    throw new NotAcceptableException(error.message)
  }
}
