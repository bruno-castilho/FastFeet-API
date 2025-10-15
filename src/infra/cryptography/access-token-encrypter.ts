import { Injectable } from '@nestjs/common'
import { AccessToken } from '../auth/access-token/access-token'
import { Encrypter } from '@/domain/users/application/cryptography/encrypter'

@Injectable()
export class AccessTokenEncrypter implements Encrypter {
  constructor(private accessTokenService: AccessToken) {}

  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return await this.accessTokenService.signAsync(payload)
  }
}
