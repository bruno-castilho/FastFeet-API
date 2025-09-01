import { Module } from '@nestjs/common'
import { EnvModule } from './env/env.module'
import { HTTPModule } from './http/http.module'

@Module({
  imports: [EnvModule, HTTPModule],
})
export class AppModule {}
