import { CreateRecipient } from '@/infra/use-cases/carrier/create-recipient'
import { Body, Controller, Post } from '@nestjs/common'
import z from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { isValidCEP } from '@/core/utils/isValidCEP'
import { isValidPhone } from '@/core/utils/isValidPhone'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

const createRecipientBodySchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.email(),
  cep: z.string().refine(isValidCEP, { message: 'CEP inválido' }),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  neighborhood: z.string(),
  number: z.coerce.number(),
  phone: z.string().refine(isValidPhone, { message: 'Telefone inválido' }),
  streetAddress: z.string(),
  complement: z.string().optional(),
})

type CreateRecipientBodySchema = z.infer<typeof createRecipientBodySchema>

@ApiTags('Recipient')
@Controller('/recipient')
export class CreateRecipientController {
  constructor(private createRecipient: CreateRecipient) {}

  @Post()
  @ApiOperation({
    summary: 'Registra um novo destinatário',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        firstName: { type: 'string', example: 'Maria' },
        lastName: { type: 'string', example: 'Oliveira' },
        email: { type: 'string', example: 'maria@email.com' },
        phone: { type: 'string', example: '(11) 91234-5678' },
        cep: { type: 'string', example: '01001-000' },
        streetAddress: { type: 'string', example: 'Rua das Flores' },
        number: { type: 'number', example: 123 },
        complement: { type: 'string', example: 'Apto 45', nullable: true },
        neighborhood: { type: 'string', example: 'Centro' },
        city: { type: 'string', example: 'São Paulo' },
        state: { type: 'string', example: 'SP' },
        country: { type: 'string', example: 'Brasil' },
      },
      required: [
        'firstName',
        'lastName',
        'email',
        'phone',
        'cep',
        'streetAddress',
        'number',
        'neighborhood',
        'city',
        'state',
        'country',
      ],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Destinatário registrado com sucesso',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Destinatário registrado com sucesso!',
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
    status: 422,
    description: 'CEP inválido',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'CEP inválido' },
      },
    },
  })
  async handle(
    @Body(new ZodValidationPipe(createRecipientBodySchema))
    body: CreateRecipientBodySchema,
  ) {
    const {
      firstName,
      lastName,
      email,
      cep,
      city,
      country,
      neighborhood,
      number,
      phone,
      state,
      streetAddress,
      complement,
    } = body

    await this.createRecipient.execute({
      firstName,
      lastName,
      email,
      cep,
      city,
      country,
      neighborhood,
      number,
      phone,
      state,
      streetAddress,
      complement,
    })

    return {
      message: 'Destinatário registrado com sucesso!',
    }
  }
}
