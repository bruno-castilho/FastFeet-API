import { UpdateRecipient } from '@/infra/use-cases/carrier/update-recipient'
import { Body, Controller, Param, Put } from '@nestjs/common'
import z from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { isValidCEP } from '@/core/utils/isValidCEP'
import { isValidPhone } from '@/core/utils/isValidPhone'
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'

const updateRecipientBodySchema = z.object({
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

type UpdateRecipientBodySchema = z.infer<typeof updateRecipientBodySchema>

@ApiTags('Recipient')
@Controller('/recipient/:recipientId')
export class UpdateRecipientController {
  constructor(private updateRecipient: UpdateRecipient) {}

  @Put()
  @ApiOperation({
    summary: 'Atualiza os dados de um destinatário',
  })
  @ApiParam({
    name: 'recipientId',
    type: 'string',
    example: 'a9f8e7d6-1234-5678-9abc-abcdef123456',
    required: true,
    description: 'ID do destinatário',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        firstName: { type: 'string', example: 'Maria' },
        lastName: { type: 'string', example: 'Oliveira' },
        email: { type: 'string', example: 'maria@email.com' },
        cep: { type: 'string', example: '01001-000' },
        city: { type: 'string', example: 'São Paulo' },
        state: { type: 'string', example: 'SP' },
        country: { type: 'string', example: 'Brasil' },
        neighborhood: { type: 'string', example: 'Centro' },
        number: { type: 'number', example: 123 },
        phone: { type: 'string', example: '(11) 91234-5678' },
        streetAddress: { type: 'string', example: 'Rua das Flores' },
        complement: { type: 'string', example: 'Apto 45', nullable: true },
      },
      required: [
        'firstName',
        'lastName',
        'email',
        'cep',
        'city',
        'state',
        'country',
        'neighborhood',
        'number',
        'phone',
        'streetAddress',
      ],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Destinatário atualizado com sucesso',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Destinatário atualizado com sucesso!',
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
    status: 404,
    description: 'Destinatário não encontrado',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example:
            'Destinatário "a9f8e7d6-1234-5678-9abc-abcdef123456" não encontrado',
        },
      },
    },
  })
  async handle(
    @Body(new ZodValidationPipe(updateRecipientBodySchema))
    body: UpdateRecipientBodySchema,
    @Param('recipientId') recipientId: string,
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

    await this.updateRecipient.execute({
      recipientId,
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
      message: 'Destinatário atualizado com sucesso!',
    }
  }
}
