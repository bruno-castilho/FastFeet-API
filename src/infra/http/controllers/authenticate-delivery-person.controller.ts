import { Body, Controller, Post } from '@nestjs/common'
import z from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { isValidCPF } from '@/core/utils/isValidCPF'
import { AuthenticateDeliveryPerson } from '@/infra/use-cases/carrier/authenticate-delivery-person'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

const authenticateDeliveryPersonBodySchema = z.object({
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

type AuthenticateDeliveryPersonBodySchema = z.infer<
  typeof authenticateDeliveryPersonBodySchema
>

@ApiTags('Auth')
@Controller('/auth/deliveryperson')
export class AuthenticateDeliveryPersonController {
  constructor(private authenticateDeliveryPerson: AuthenticateDeliveryPerson) {}

  @Post()
  @ApiOperation({
    summary: 'Autentica um entregador e retorna um access token',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        cpf: { type: 'string' },
        password: { type: 'string' },
      },
      required: ['cpf', 'password'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Autenticação realizada com sucesso',
    schema: {
      type: 'object',
      properties: {
        accessToken: {
          type: 'string',
        },
        message: { type: 'string', example: 'Bem Vindo!' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Parâmetros inválidos',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Erro de validação' },
        errors: { type: 'object' },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciais inválidas',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Credenciais inválidas' },
      },
    },
  })
  async handle(
    @Body(new ZodValidationPipe(authenticateDeliveryPersonBodySchema))
    body: AuthenticateDeliveryPersonBodySchema,
  ) {
    const { cpf, password } = body

    const { accessToken } = await this.authenticateDeliveryPerson.execute({
      cpf,
      password,
    })

    return {
      accessToken,
      message: 'Bem Vindo!',
    }
  }
}
