import { RecipientDoesNotExistsError } from '@/domain/carrier/application/use-cases/errors/recipient-does-not-exists-error'
import { Catch, ExceptionFilter, NotFoundException } from '@nestjs/common'

@Catch(RecipientDoesNotExistsError)
export class RecipientDoesNotExistsExceptionFilter implements ExceptionFilter {
  catch(error: RecipientDoesNotExistsError) {
    throw new NotFoundException(error.message)
  }
}
