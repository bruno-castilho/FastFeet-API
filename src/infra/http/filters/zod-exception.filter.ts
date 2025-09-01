import { Catch, ExceptionFilter, BadRequestException } from '@nestjs/common'
import { ZodError } from 'zod'
import { fromZodError } from 'zod-validation-error'

@Catch(ZodError)
export class ZodExceptionFilter implements ExceptionFilter {
  catch(error: ZodError) {
    throw new BadRequestException({
      message: 'Erro de validação',
      erros: fromZodError(error),
    })
  }
}
