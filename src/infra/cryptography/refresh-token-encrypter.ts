import { Injectable } from '@nestjs/common'
import { RefreshToken } from '../auth/refresh-token/refresh-token'
import { Encrypter } from '@/domain/users/application/cryptography/encrypter'

@Injectable()
export class RefreshTokenEncrypter implements Encrypter {
  constructor(private refreshTokenService: RefreshToken) {}

  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return await this.refreshTokenService.signAsync(payload)
  }
}
