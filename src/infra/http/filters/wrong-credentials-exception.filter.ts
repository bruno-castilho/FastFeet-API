import { WrongCredentialsError } from '@/domain/carrier/application/use-cases/errors/wrong-credentials-error'
import { Catch, ExceptionFilter, UnauthorizedException } from '@nestjs/common'

@Catch(WrongCredentialsError)
export class WrongCredentialsExceptionFilter implements ExceptionFilter {
  catch(exception: WrongCredentialsError) {
    throw new UnauthorizedException(exception.message)
  }
}
