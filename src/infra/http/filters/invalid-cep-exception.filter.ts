import { InvalidCEPError } from '@/domain/carrier/application/use-cases/errors/invalid-cep-error'
import { Catch, ExceptionFilter, BadRequestException } from '@nestjs/common'

@Catch(InvalidCEPError)
export class InvalidCEPExceptionFilter implements ExceptionFilter {
  catch(error: InvalidCEPError) {
    throw new BadRequestException(error.message)
  }
}
