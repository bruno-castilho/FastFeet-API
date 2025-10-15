import { EnvModule } from '@/infra/env/env.module'
import { EnvService } from '@/infra/env/env.service'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AccessToken } from './access-token'
import { PassportModule } from '@nestjs/passport'
import { AccessTokenStrategy } from './access-token.strategy'
import { APP_GUARD } from '@nestjs/core'
import { AccessTokenGuard } from './access-token.guard'
import { DatabaseModule } from '@/infra/database/database.module'

@Module({
  imports: [
    DatabaseModule,
    EnvModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [EnvModule],
      inject: [EnvService],
      useFactory: (env: EnvService) => ({
        signOptions: { algorithm: 'HS256', expiresIn: '10m' },
        secret: env.get('ACCESS_TOKEN_SECRET'),
      }),
    }),
  ],
  providers: [
    AccessToken,
    AccessTokenStrategy,
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ],
  exports: [AccessToken],
})
export class AccessTokenModule {}
