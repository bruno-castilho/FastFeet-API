import { PackageDoesNotExistsError } from '@/domain/carrier/application/use-cases/errors/package-does-not-exists-error'
import { Catch, ExceptionFilter, NotFoundException } from '@nestjs/common'

@Catch(PackageDoesNotExistsError)
export class PackageDoesNotExistsExceptionFilter implements ExceptionFilter {
  catch(error: PackageDoesNotExistsError) {
    throw new NotFoundException(error.message)
  }
}
