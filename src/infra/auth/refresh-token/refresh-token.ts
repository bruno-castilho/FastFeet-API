import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class RefreshToken {
  constructor(private readonly jwtService: JwtService) {}

  async signAsync(payload: object) {
    return await this.jwtService.signAsync(payload)
  }
}
