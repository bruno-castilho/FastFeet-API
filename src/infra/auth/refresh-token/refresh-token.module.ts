import { EnvModule } from '@/infra/env/env.module'
import { EnvService } from '@/infra/env/env.service'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { RefreshToken } from './refresh-token'
import { RefreshTokenStrategy } from './refresh-token.strategy'
import { APP_GUARD } from '@nestjs/core'
import { RefreshTokenGuard } from './refresh-token.guard'
import { DatabaseModule } from '@/infra/database/database.module'

@Module({
  imports: [
    DatabaseModule,
    EnvModule,
    JwtModule.registerAsync({
      imports: [EnvModule],
      inject: [EnvService],
      useFactory(env: EnvService) {
        const privateKey = env.get('REFRESH_TOKEN_PRIVATE_KEY')
        const publicKey = env.get('REFRESH_TOKEN_PUBLIC_KEY')

        return {
          signOptions: { algorithm: 'RS256', expiresIn: '14d' },
          privateKey: Buffer.from(privateKey, 'base64'),
          publicKey: Buffer.from(publicKey, 'base64'),
        }
      },
    }),
  ],
  providers: [
    RefreshToken,
    RefreshTokenStrategy,
    {
      provide: APP_GUARD,
      useClass: RefreshTokenGuard,
    },
  ],
  exports: [RefreshToken],
})
export class RefreshTokenModule {}
