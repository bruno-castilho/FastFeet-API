import { UploadAndCreatePhotoDeliveredPackage } from '@/infra/use-cases/upload-and-create-photo-delivered-package'
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

@Controller('/photodeliveredpackage')
export class UploadAndCreatePhotoDeliveredPackageController {
  constructor(
    private uploadAndCreatePhotoDeliveredPackage: UploadAndCreatePhotoDeliveredPackage,
  ) {}

  @Post()
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
