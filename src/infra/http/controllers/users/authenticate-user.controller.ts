import { Body, Controller, Headers, Ip, Post, Res } from '@nestjs/common'
import z from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { isValidCPF } from '@/core/utils/isValidCPF'

import { Public } from '@/infra/auth/decorators/public.decorator'
import { ApiTags } from '@nestjs/swagger'
import { AuthenticateUser } from '@/infra/use-cases/users/authenticate-user'
import { AuthenticateUserDocs } from './docs/authenticate-user.docs'
import type { Response } from 'express'

const authenticateUserBodySchema = z.object({
  cpf: z.string().refine(isValidCPF, { message: 'CPF inválido' }),
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

type AuthenticateUserBodySchema = z.infer<typeof authenticateUserBodySchema>

@Public()
@ApiTags('Users')
@Controller('/users/login')
export class AuthenticateUserController {
  constructor(private authenticateUser: AuthenticateUser) {}

  @Post()
  @AuthenticateUserDocs()
  async handle(
    @Body(new ZodValidationPipe(authenticateUserBodySchema))
    body: AuthenticateUserBodySchema,
    @Headers('User-Agent') userAgent: string,
    @Ip()
    ip: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { cpf, password } = body

    const { accessToken, refreshToken } = await this.authenticateUser.execute({
      cpf,
      password,
      userAgent,
      ip,
    })

    response.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 14 * 24 * 60 * 60 * 1000, // 14 days
    })

    return {
      accessToken,
      refreshToken,
      message: 'Bem Vindo!',
    }
  }
}
