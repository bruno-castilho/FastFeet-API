import { EmailAlreadyExistsError } from '@/domain/users/application/use-cases/errors/email-already-exists-error'
import { Catch, ExceptionFilter, ConflictException } from '@nestjs/common'

@Catch(EmailAlreadyExistsError)
export class EmailAlreadyExistsExceptionFilter implements ExceptionFilter {
  catch(exception: EmailAlreadyExistsError) {
    throw new ConflictException(exception.message)
  }
}
