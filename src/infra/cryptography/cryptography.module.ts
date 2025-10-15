import { Module } from '@nestjs/common'
import { BcryptHasher } from './bcrypt-hasher'
import { AccessTokenEncrypter } from './access-token-encrypter'
import { RefreshTokenEncrypter } from './refresh-token-encrypter'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [AuthModule],
  providers: [BcryptHasher, AccessTokenEncrypter, RefreshTokenEncrypter],
  exports: [BcryptHasher, AccessTokenEncrypter, RefreshTokenEncrypter],
})
export class CryptographyModule {}
