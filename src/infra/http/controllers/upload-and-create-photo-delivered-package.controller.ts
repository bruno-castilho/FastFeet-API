import { UploadAndCreatePhotoDeliveredPackage } from '@/infra/use-cases/carrier/upload-and-create-photo-delivered-package'
import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'

@ApiTags('Package')
@Controller('package/photodeliveredpackage')
export class UploadAndCreatePhotoDeliveredPackageController {
  constructor(
    private uploadAndCreatePhotoDeliveredPackage: UploadAndCreatePhotoDeliveredPackage,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Faz upload da foto da encomenda entregue',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Arquivo de imagem JPEG ou PNG de até 2MB',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
      required: ['file'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Foto da encomenda entregue carregada com sucesso',
    schema: {
      type: 'object',
      properties: {
        photoDeliveredPackageId: {
          type: 'string',
          example: 'd8e7f6a5-1234-5678-9abc-abcdef987654',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Parâmetros inválidos ou arquivo ausente',
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
    description: 'Tipo de arquivo inválido',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Tipo de arquivo inválido para foto da encomenda entregue',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async handle(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1024 * 1024 * 2, // 2mb
          }),
          new FileTypeValidator({
            fileType: '.(png|jpg|jpeg)',
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const { photoDeliveredPackage } =
      await this.uploadAndCreatePhotoDeliveredPackage.execute({
        fileName: file.originalname,
        fileType: file.mimetype,
        body: file.buffer,
      })

    return {
      photoDeliveredPackageId: photoDeliveredPackage.id.toString(),
    }
  }
}
