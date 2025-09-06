import { Module } from '@nestjs/common'
import { BcryptHasher } from './bcrypt-hasher'
import { JwtEncrypter } from './jwt-encrypter'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [AuthModule],
  providers: [BcryptHasher, JwtEncrypter],
  exports: [BcryptHasher, JwtEncrypter],
})
export class CryptographyModule {}
