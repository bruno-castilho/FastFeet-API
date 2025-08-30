import { InMemoryPhotoDeliveredPackageRepository } from 'test/repositories/in-memory-photo-delivered-package-repository'
import { UploadAndCreatePhotoDeliveredPackageUseCase } from './upload-and-create-photo-delivered'
import { FakeUploader } from 'test/storage/fake-uploader'
import { InvalidPhotoDeliveredPackageTypeError } from './errors/invalid-photo-delivered-package-type-error'

let inMemoryPhotoDeliveredPackageRepository: InMemoryPhotoDeliveredPackageRepository
let fakeUploader: FakeUploader

let sut: UploadAndCreatePhotoDeliveredPackageUseCase

describe('Upload and create photo delivered package', () => {
  beforeEach(() => {
    inMemoryPhotoDeliveredPackageRepository =
      new InMemoryPhotoDeliveredPackageRepository()
    fakeUploader = new FakeUploader()

    sut = new UploadAndCreatePhotoDeliveredPackageUseCase(
      inMemoryPhotoDeliveredPackageRepository,
      fakeUploader,
    )
  })

  it('should be able to upload and create an photo delivered package', async () => {
    const { photodeliveredpackage } = await sut.execute({
      fileName: 'profile.png',
      fileType: 'image/png',
      body: Buffer.from(''),
    })

    expect(photodeliveredpackage).toEqual(
      inMemoryPhotoDeliveredPackageRepository.items[0],
    )
    expect(fakeUploader.uploads).toHaveLength(1)
    expect(fakeUploader.uploads[0]).toEqual(
      expect.objectContaining({
        fileName: 'profile.png',
      }),
    )
  })

  it('should not be able to upload an photo delivered package with invalid file type', async () => {
    await expect(() =>
      sut.execute({
        fileName: 'profile.mp3',
        fileType: 'audio/mpeg',
        body: Buffer.from(''),
      }),
    ).rejects.toBeInstanceOf(InvalidPhotoDeliveredPackageTypeError)
  })
})
