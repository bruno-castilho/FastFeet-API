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
import { UploadAndCreatePhotoDeliveredPackageDocs } from './docs/upload-and-create-photo-delivered-package.docs'
import { ApiTags } from '@nestjs/swagger'
import { Roles } from '@/infra/auth/decorators/roles.decorator'

@ApiTags('Package')
@Roles('DELIVERY_PERSON')
@Controller('package/photodeliveredpackage')
export class UploadAndCreatePhotoDeliveredPackageController {
  constructor(
    private uploadAndCreatePhotoDeliveredPackage: UploadAndCreatePhotoDeliveredPackage,
  ) {}

  @Post()
  @UploadAndCreatePhotoDeliveredPackageDocs()
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
