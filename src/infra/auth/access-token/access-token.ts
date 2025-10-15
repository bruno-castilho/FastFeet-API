import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AccessToken {
  constructor(private readonly jwtService: JwtService) {}

  async signAsync(payload: object) {
    return await this.jwtService.signAsync(payload)
  }
}
