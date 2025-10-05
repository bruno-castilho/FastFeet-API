import { CreateDeliveryPerson } from '@/infra/use-cases/carrier/create-delivery-person'
import { Body, Controller, Post } from '@nestjs/common'
import z from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { isValidCPF } from '@/core/utils/isValidCPF'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

const createDeliveryPersonBodySchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  cpf: z.string().refine(isValidCPF, { message: 'CPF inválido' }),
  email: z.email(),
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

type CreateDeliveryPersonBodySchema = z.infer<
  typeof createDeliveryPersonBodySchema
>

@ApiTags('Deliveryperson')
@Controller('/deliveryperson')
export class CreateDeliveryPersonController {
  constructor(private createDeliveryPerson: CreateDeliveryPerson) {}

  @Post()
  @ApiOperation({
    summary: 'Registra um novo entregador',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        firstName: { type: 'string', example: 'João' },
        lastName: { type: 'string', example: 'Silva' },
        cpf: { type: 'string', example: '39053344705' },
        email: { type: 'string', example: 'joao@email.com' },
        password: { type: 'string', example: 'Senha@123' },
      },
      required: ['firstName', 'lastName', 'cpf', 'email', 'password'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Entregador registrado com sucesso',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Entregador registrado com sucesso!',
        },
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
    status: 409,
    description: 'E-mail já cadastrado',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'E-mail já cadastrado' },
      },
    },
  })
  @ApiResponse({
    status: 409,
    description: 'CPF já cadastrado',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'CPF já cadastrado' },
      },
    },
  })
  async handle(
    @Body(new ZodValidationPipe(createDeliveryPersonBodySchema))
    body: CreateDeliveryPersonBodySchema,
  ) {
    const { firstName, lastName, cpf, email, password } = body

    await this.createDeliveryPerson.execute({
      firstName,
      lastName,
      cpf,
      email,
      password,
    })

    return {
      message: 'Entregador registrado com sucesso!',
    }
  }
}
