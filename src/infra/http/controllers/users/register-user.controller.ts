import { Body, Controller, Post } from '@nestjs/common'
import z from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { isValidCPF } from '@/core/utils/isValidCPF'

import { ApiTags } from '@nestjs/swagger'
import { RegisterUser } from '@/infra/use-cases/users/register-user'
import { RegisterUserDocs } from './docs/register-user.docs'
import { Public } from '@/infra/auth/decorators/public.decorator'

const registerUserBodySchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  cpf: z.string().refine(isValidCPF, { message: 'CPF inválido' }),
  email: z.email(),
  role: z.enum(['ADMIN', 'DELIVERY_PERSON']),
  password: z
    .string()
    .trim()
    .min(8, { message: 'A senha deve ter no mínimo 8 caracteres' })
    .regex(/(?=.*[A-Z])/, {
      message: 'A senha deve conter pelo menos uma letra maiúscula',
    })
    .regex(/(?=.*[0-9])/, {
      message: 'A senha deve conter pelo menos um número',
    })
    .regex(/(?=.*[!@#$%^&*(),.?":{}|<>])/, {
      message: 'A senha deve conter pelo menos um símbolo especial',
    }),
})

type RegisterUserBodySchema = z.infer<typeof registerUserBodySchema>

@ApiTags('Users')
@Public()
@Controller('/users')
export class RegisterUserController {
  constructor(private registerUser: RegisterUser) {}

  @Post()
  @RegisterUserDocs()
  async handle(
    @Body(new ZodValidationPipe(registerUserBodySchema))
    body: RegisterUserBodySchema,
  ) {
    const { firstName, lastName, role, cpf, email, password } = body

    await this.registerUser.execute({
      firstName,
      lastName,
      role,
      cpf,
      email,
      password,
    })

    return {
      message: 'Usuário registrado com sucesso!',
    }
  }
}
