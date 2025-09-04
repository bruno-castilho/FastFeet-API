import { Module } from '@nestjs/common'

import { EnvModule } from '../env/env.module'
import { S3Storage } from './s3-storage'

@Module({
  imports: [EnvModule],
  providers: [S3Storage],
  exports: [S3Storage],
})
export class StorageModule {}
