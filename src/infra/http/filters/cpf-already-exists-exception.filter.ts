import { CPFAlreadyExistsError } from '@/domain/users/application/use-cases/errors/cpf-already-exists-error'
import { Catch, ExceptionFilter, ConflictException } from '@nestjs/common'

@Catch(CPFAlreadyExistsError)
export class CPFAlreadyExistsExceptionFilter implements ExceptionFilter {
  catch(exception: CPFAlreadyExistsError) {
    throw new ConflictException(exception.message)
  }
}
